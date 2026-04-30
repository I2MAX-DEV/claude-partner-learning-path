# Claude Partner Learning Path

A set of Jupyter notebooks and runnable projects for learning the [Anthropic Claude API](https://docs.anthropic.com/) and the Model Context Protocol. Each module walks through a single concept with hands-on examples.

## Courses

### 📘 [Building with the Claude API](Building%20with%20the%20Claude%20API/README.md)

Notebook-based course covering the Claude API end-to-end: requests and streaming, system prompts and temperature, prompt engineering, prompt evaluation, tool use, citations, prompt caching, code execution, MCP, RAG, agents/workflows, and a final assessment.

- 🎓 Anthropic Academy: <https://anthropic.skilljar.com/claude-with-the-anthropic-api>
- 📁 Local: [`Building with the Claude API/README.md`](Building%20with%20the%20Claude%20API/README.md) — full file list and per-section topics.

### 📗 [Introduction to Model Context Protocol](Introduction%20to%20Model%20Context%20Protocol/README.md)

Standalone, runnable MCP CLI project that chats with Claude through an MCP server exposing tools, resources, and prompts. Includes the MCP Inspector workflow (`mcp dev mcp_server.py`).

- 🎓 Anthropic Academy: <https://anthropic.skilljar.com/introduction-to-model-context-protocol>
- 📁 Local: [`Introduction to Model Context Protocol/README.md`](Introduction%20to%20Model%20Context%20Protocol/README.md) — setup, `.env` keys, and run commands.

### 📙 [Claude Code in Action](Claude%20Code%20in%20Action/Readme.md)

Hands-on course for the Claude Code CLI, with two working codebases under [`Claude Code in Action/`](Claude%20Code%20in%20Action/Readme.md):

- **`uigen`** — Next.js 15 / React 19 starter (AI-powered React component generator with live preview, Prisma + SQLite, Tailwind v4).
- **`queries`** — TypeScript SQLite e-commerce query library used to practice Claude Code hooks, custom commands, and the Agent SDK.

- 🎓 Anthropic Academy: <https://anthropic.skilljar.com/claude-code-in-action>
- 📁 Local: [`Claude Code in Action/Readme.md`](Claude%20Code%20in%20Action/Readme.md) — Claude Code install steps and per-project setup (`npm run setup`, `.env` with `ANTHROPIC_API_KEY`).

### 📕 Introduction to Agent Skills

Anthropic Academy course on building and using **Agent Skills** with Claude. No local project in this repo — take it directly on Anthropic Academy.

- 🎓 Anthropic Academy: <https://anthropic.skilljar.com/introduction-to-agent-skills>

## Certificates of Completion

After finishing all lessons in a course on [Anthropic Academy](https://anthropic.skilljar.com/), you can claim a **Certificate of Completion**.

- Open the completed course page (e.g. *Claude Code in Action*) — the progress bar will show **100%**.
- Click **View certificate** to open the shareable certificate URL.
- From the certificate page, you can copy the public view link or download it as a **PDF**.

## Requirements

- **Python 3.10+**
- **An Anthropic API key** — create one at <https://console.anthropic.com/settings/keys>. You'll need billing or free trial credits on the account to make real requests.
- **Jupyter** (or VS Code with the Jupyter extension) to open the notebooks.

Python packages (also in `requirements.txt`):

- `anthropic` — official Anthropic Python SDK
- `python-dotenv` — loads the API key from a `.env` file
- `jupyter`

> The MCP CLI project under [`Introduction to Model Context Protocol/`](Introduction%20to%20Model%20Context%20Protocol/README.md) has its own dependencies managed via `uv` / `pyproject.toml`.

## Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/I2MAX-DEV/claude-partner-learning-path.git
   cd claude-partner-learning-path
   ```

2. **Create a virtual environment and install dependencies**

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate       # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Add your API key**

   Copy the example file and paste in your real key:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env`:

   ```
   ANTHROPIC_API_KEY="sk-ant-api03-...your-key-here..."
   ```

   > ⚠️ **Do not commit `.env`.** It is already listed in `.gitignore`. Treat the key like a password — if it leaks, revoke it immediately from the Anthropic console.

4. **Launch Jupyter**
   ```bash
   jupyter notebook
   ```
   Then open any of the `.ipynb` files and run the cells in order.

## Quick sanity check

Once `.env` is set up, this snippet should print a reply:

```python
from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()
client = Anthropic()

msg = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=128,
    messages=[{"role": "user", "content": "Say hello in one sentence."}],
)
print(msg.content[0].text)
```

## Troubleshooting

- **`anthropic.AuthenticationError`** — `ANTHROPIC_API_KEY` isn't set or is wrong. Check `.env` is in the project root and you ran `load_dotenv()` before creating the client.
- **`ModuleNotFoundError: anthropic`** — the notebook's kernel is pointing at a different Python. In Jupyter select the kernel from your `.venv`, or re-run `%pip install anthropic python-dotenv` in the first cell.
- **Credit / rate-limit errors** — check your [usage dashboard](https://console.anthropic.com/settings/usage) and billing.

## License

For learning purposes only.
