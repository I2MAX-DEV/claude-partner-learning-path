# Claude Code in Action

## How to Install Claude Code

You can find full setup instructions here: https://code.claude.com/docs/en/quickstart

In short, you'll need to do the following:

### Install Claude Code

- **MacOS, Linux, WSL:**
  ```bash
  curl -fsSL https://claude.ai/install.sh | bash
  ```
- **Windows PowerShell:**
  ```powershell
  irm https://claude.ai/install.ps1 | iex
  ```
- **Windows Command Prompt (cmd.exe):**
  ```cmd
  curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
  ```
- **MacOS (Homebrew):**
  ```bash
  brew install --cask claude-code
  ```

After installation, run `claude` at your terminal. The first time you run this command you will be prompted to pick a color theme for the terminal and authenticate with your claude.ai credentials.

## Project Setup

This project requires a small amount of setup:

1. Ensure you have Node JS installed locally. [Link to installation directions](https://nodejs.org/en/download).
2. `cd` into the `uigen` folder.
3. In the project directory, run `npm run setup` to install dependencies and set up a local SQLite database.
4. **Optional:** this project uses Claude through the Anthropic API to generate UI components. If you want to fully test out the app, you will need to provide an API key to access the Anthropic API. You can skip this, and the app will still generate some static fake code. Here's how you can set the API key:
   - Get an Anthropic API key at [console.anthropic.com](https://console.anthropic.com/).
   - In the `uigen` folder, create a new file named `.env` based on the provided `.env.example`. You can copy it with:

     ```bash
     cp .env.example .env
     ```

   - Open `.env` and replace the literal text `your-api-key-here` with your key from the Anthropic console.
5. Start the project by running `npm run dev`.
