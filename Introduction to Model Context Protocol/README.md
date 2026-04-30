# Introduction to Model Context Protocol

A standalone, runnable MCP CLI project that lets you chat with Claude through an MCP server exposing tools, resources, and prompts.

For repo-wide context and the broader Claude API course, see the [root README](../README.md).

## Files

| File | Topic |
| --- | --- |
| `mcp/main.py` | CLI entry point — wires Claude, the chat loop, and the MCP client together |
| `mcp/mcp_server.py` | MCP server defining tools, resources, and prompts (run via `mcp dev`) |
| `mcp/mcp_client.py` | MCP client that connects to the server over stdio |
| `mcp/core/` | Chat loop, Claude wrapper, CLI helpers, and tool registry |
| `mcp/pyproject.toml` | Project dependencies (`anthropic`, `mcp[cli]`, `prompt-toolkit`, `python-dotenv`) |
| [`Final_assessment_MCP.md`](Final_assessment_MCP.md) | End-of-course quiz with answers |

## Setup and run

1. **Change into the project directory**
   ```bash
   cd mcp
   ```

2. **Create a virtual environment and install dependencies**

   Using `uv` (recommended — matches `uv.lock`):
   ```bash
   uv sync
   ```

   Or using `pip`:
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate       # Windows: .venv\Scripts\activate
   pip install "anthropic>=0.51.0" "mcp[cli]>=1.8.0" "prompt-toolkit>=3.0.51" "python-dotenv>=1.1.0"
   ```

3. **Create a `.env` file in the `mcp/` folder**

   ```env
   CLAUDE_MODEL="claude-sonnet-4-5"
   ANTHROPIC_API_KEY="sk-ant-your_API_KEY"

   # Set to 1 if you're using uv to run the project
   # Set to 0 if you're *not* using uv
   USE_UV=1
   ```

   > ⚠️ **Do not commit `.env`.** Treat the key like a password — if it leaks, revoke it immediately from the [Anthropic console](https://console.anthropic.com/settings/keys).

4. **Run the CLI app**
   ```bash
   uv run main.py        # if USE_UV=1
   # or
   python main.py        # if USE_UV=0
   ```

5. **Inspect / debug the MCP server**

   From inside the `mcp/` folder, launch the MCP Inspector to test tools, resources, and prompts in isolation before connecting to the full app:
   ```bash
   mcp dev mcp_server.py
   ```
