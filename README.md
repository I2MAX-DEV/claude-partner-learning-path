# Claude Partner Learning Path

A set of Jupyter notebooks for learning the [Anthropic Claude API](https://docs.anthropic.com/). Each notebook walks through a single concept with runnable examples.

## Notebooks

### Accessing Claude with the API

| File | Topic |
| --- | --- |
| `001_requests.ipynb` | Basic request/response, multi-turn conversation |
| `001_requests_exercise.ipynb` | Practice exercises for basic requests |
| `002_system_prompt.ipynb` | Using system prompts to steer Claude |
| `003_temperature.ipynb` | Controlling randomness with `temperature` |
| `004_controlling_output.ipynb` | Shaping output (length, format, stop sequences) |
| `004_streaming.ipynb` | Streaming responses token-by-token |
| `Quiz on accessing Claude with the API.md` | Quiz with answers |

### Prompt Evaluation

| File | Topic |
| --- | --- |
| `005_prompt_evals.ipynb` | Dataset generation for prompt evaluation |
| `005_prompt_evals_running.ipynb` | Running prompts against test cases |
| `005_prompt_evals_grader.ipynb` | Grading outputs with model-based evaluation |
| `005_prompt_evals_fns.ipynb` | Adding evaluation criteria to grading |
| `005_prompt_evals_complete.ipynb` | Complete evaluation pipeline |
| `PromptEvaluationQuiz.md` | Quiz with answers |

## ⚠️ Note on model versions

These notebooks use a **newer Claude model** than the one shown in the original Anthropic learning path, so some outputs (wording, formatting, token counts) will differ from the course material. The code itself is the same — only the `model` string is updated.

```python
model = "claude-sonnet-4-6"   # used in this repo
```

**If you want to reproduce the exact behavior shown in the learning path**, change `model` in the first cells of each notebook to the older version the course uses, for example:

```python
model = "claude-3-5-sonnet-20241022"   # or whichever version the course specifies
```

Then re-run the cells. Anthropic keeps older model IDs available — see the [models list](https://docs.anthropic.com/en/docs/about-claude/models) for valid options. If an ID is retired you'll get a 404 from the API; pick the closest still-supported one.

## Requirements

- **Python 3.10+**
- **An Anthropic API key** — create one at <https://console.anthropic.com/settings/keys>. You'll need billing or free trial credits on the account to make real requests.
- **Jupyter** (or VS Code with the Jupyter extension) to open the notebooks.

Python packages (also in `requirements.txt`):
- `anthropic` — official Anthropic Python SDK
- `python-dotenv` — loads the API key from a `.env` file
- `jupyter`

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
