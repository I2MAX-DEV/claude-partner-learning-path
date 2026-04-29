# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Setup (first time, or after dependency changes):

```bash
uv venv
source .venv/bin/activate
uv pip install -e .
```

Run the MCP server (stdio transport — typically launched by an MCP client, not a human):

```bash
uv run main.py
```

Test:

```bash
uv run pytest                                  # full suite
uv run pytest tests/test_document.py           # one file
uv run pytest tests/test_document.py::TestBinaryDocumentToMarkdown::test_binary_document_to_markdown_with_pdf  # one test
uv run pytest -k pdf                           # by keyword
```

## Architecture

This is a **FastMCP server** that exposes Python functions as tools to MCP clients (e.g. Claude Desktop, Claude Code).

The wiring is intentionally thin and lives in two layers:

- `tools/*.py` — pure Python functions. Each function is a candidate MCP tool. They are not auto-discovered.
- `main.py` — constructs the `FastMCP("docs")` instance and **explicitly registers** each tool with `mcp.tool()(fn)`. A function in `tools/` is invisible to clients until it is registered here.

**When adding a new tool, you must do both:** implement the function in `tools/` *and* register it in `main.py`. The current `tools/document.py::binary_document_to_markdown` is implemented and tested but **not registered** in `main.py` — so it is not exposed to clients yet. Treat that as a likely bug, not a pattern to copy.

### Tool authoring conventions

Tool functions are the contract surface — their signature and docstring are what the LLM sees. Two requirements that are not enforced by the runtime but are project policy (see `README.md`):

1. **Parameters use `pydantic.Field(description=...)`** for every argument — this is what populates the tool's input schema for the client. A bare type annotation produces a tool with no parameter docs. See `tools/math.py::add` for the canonical shape.
2. **Docstrings follow a fixed structure**: one-line summary, longer behavior description, a "When to use" section, and `>>>` examples. This is what the model reads to decide whether to call the tool.

### Tests

Tests in `tests/` use **real document fixtures** (`tests/fixtures/mcp_docs.{pdf,docx}`), not mocks — `markitdown` and the underlying PDF/DOCX parsers are exercised end-to-end. If you change document-conversion code, the assertions are loose (presence of markdown markers); add stricter checks when behavior matters.
