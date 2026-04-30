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

This course ships with **two working codebases**. Pick the folder that matches the lesson you're on:

- **`uigen`** — used for the early lessons (Next.js 15 / React 19 AI component generator).
- **`queries`** — used for the later lessons on hooks, custom commands, and the Agent SDK (TypeScript SQLite e-commerce queries).

Steps:

1. Ensure you have Node JS installed locally. [Link to installation directions](https://nodejs.org/en/download).
2. `cd` into the folder for the lesson you are doing — either `uigen` or `queries`:

   ```bash
   cd uigen      # for uigen lessons
   # or
   cd queries    # for queries lessons
   ```

3. In that project directory, run `npm run setup` to install dependencies and set up a local SQLite database.
4. **Optional:** these projects use Claude through the Anthropic API. If you want to fully test the app, provide an API key. You can skip this, and `uigen` will still generate some static fake code. Here's how to set the API key:
   - Get an Anthropic API key at [console.anthropic.com](https://console.anthropic.com/).
   - In the project folder you `cd`-ed into, create a new file named `.env` based on the provided `.env.example`:

     ```bash
     cp .env.example .env
     ```

   - Open `.env` and replace the literal text `your-api-key-here` with your key from the Anthropic console.
5. Start the project (for `uigen`, run `npm run dev`).
6. **Open Claude Code in that same folder** — from inside `uigen` or `queries`, run:

   ```bash
   claude
   ```

   Claude Code uses the current working directory as the project root, so always launch it from the folder for the lesson you are on.

## GitHub Integrations

If you want to test Claude's GitHub integration after cloning this repo:

1. **Remove the existing git origin and set your own repository**

   ```bash
   git remote remove origin
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. **Install the GitHub App**

   Run `/install-github-app` in Claude Code. This command walks you through the setup process:
   - Install the Claude Code app on GitHub
   - Add your API key
   - Automatically generate a pull request with the workflow files

3. **Merge the generated PR**

   The generated pull request adds two GitHub Actions to your repository. Once merged, you'll have the workflow files in your `.github/workflows` directory.

After setup, you can test Claude's GitHub integration by creating issues, pull requests, and using Claude Code's GitHub-aware commands.
