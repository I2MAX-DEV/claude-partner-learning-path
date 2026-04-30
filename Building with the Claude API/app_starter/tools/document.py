import os

from markitdown import MarkItDown, StreamInfo
from io import BytesIO
from pydantic import Field


def binary_document_to_markdown(binary_data: bytes, file_type: str) -> str:
    """Converts binary document data to markdown-formatted text."""
    md = MarkItDown()
    file_obj = BytesIO(binary_data)
    stream_info = StreamInfo(extension=file_type)
    result = md.convert(file_obj, stream_info=stream_info)
    return result.text_content


def document_path_to_markdown(
    file_path: str = Field(
        description="Absolute or relative path to a document on the local filesystem (e.g. .pdf, .docx)."
    ),
) -> str:
    """Read a document from disk and convert it to markdown-formatted text.

    Resolves the file at `file_path`, infers the document type from its
    extension, reads the file as binary, and converts the contents to
    markdown using the same conversion pipeline as
    `binary_document_to_markdown`. Raises `FileNotFoundError` if the path
    does not point to an existing file, and `ValueError` if the path has
    no extension to infer the type from.

    When to use:
    - When you have a path to a document on the local filesystem and want its textual content as markdown
    - When the caller can supply a path but not the raw bytes (e.g. converting fixtures, attachments, or downloaded files)
    - Prefer `binary_document_to_markdown` when you already have the bytes in memory

    Examples:
    >>> document_path_to_markdown("tests/fixtures/mcp_docs.pdf")  # doctest: +SKIP
    '# Model Context Protocol\\n...'
    >>> document_path_to_markdown("tests/fixtures/mcp_docs.docx")  # doctest: +SKIP
    '# Model Context Protocol\\n...'
    """
    if not os.path.isfile(file_path):
        raise FileNotFoundError(f"No file found at path: {file_path}")

    file_type = os.path.splitext(file_path)[1].lstrip(".").lower()
    if not file_type:
        raise ValueError(
            f"Cannot infer file type: path has no extension: {file_path}"
        )

    with open(file_path, "rb") as f:
        binary_data = f.read()

    return binary_document_to_markdown(binary_data, file_type)
