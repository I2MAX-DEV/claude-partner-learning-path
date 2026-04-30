# Claude Code in Action — Full Course Notes

> Notes from a video course about working with the Claude language model and Claude Code.

---

## Table of Contents

1. [What is a Coding Assistant?](#1-what-is-a-coding-assistant)
2. [Claude Code in Action](#2-claude-code-in-action)
3. [Adding Context](#3-adding-context)
4. [Making Changes](#4-making-changes)
5. [Controlling Context](#5-controlling-context)
6. [Custom Commands](#6-custom-commands)
7. [Extending Claude Code with MCP Servers](#7-extending-claude-code-with-mcp-servers)
8. [GitHub Integration](#8-github-integration)
9. [Introducing Hooks](#9-introducing-hooks)
10. [Defining Hooks](#10-defining-hooks)
11. [Implementing a Hook](#11-implementing-a-hook)
12. [Useful Hooks](#12-useful-hooks)
13. [The Claude Code SDK](#13-the-claude-code-sdk)

---

## 1. What is a Coding Assistant?

**Coding Assistant** = a tool that uses language models to write code and complete development tasks.

### Core Process

1. Receives a task (e.g., fix a bug from an error message)
2. Language model gathers context (reads files, understands codebase)
3. Formulates a plan to solve the issue
4. Takes action (updates files, runs tests)

### Key Limitation

Language models only process text input/output — they **cannot directly** read files, run commands, or interact with external systems.

### Tool Use System

A method enabling language models to perform actions:

- Assistant appends instructions to the user request
- Instructions specify formatted responses for actions (e.g., `read file: filename`)
- Language model responds with a formatted action request
- Assistant executes the actual action (reads file, runs command)
- Results are sent back to the language model for the final response

### Why Claude Models Excel

- Superior tool use capabilities vs. other language models
- Better at understanding tool functions and combining them for complex tasks
- Claude Code is **extensible** — easy to add new tools
- Better security through direct code search vs. indexing that sends the codebase to external servers

### Essential Points

- All language models require tool use for non-text generation tasks
- Tool use quality directly impacts coding assistant effectiveness
- Claude's strength in tool use makes it adaptable to development changes

---

## 2. Claude Code in Action

**Claude Code** = AI assistant with tool-based capabilities for code tasks.

**Default tools:** file reading/writing, command execution, basic development operations.

### Real-World Demos

**Performance optimization**
Claude analyzed the Chalk JavaScript library (5th most downloaded JS package, 429M weekly downloads). It used benchmarks, profiling tools, created todo lists, identified bottlenecks, and implemented fixes — resulting in a **3.9× throughput improvement**.

**Data analysis**
Claude performed churn analysis on video streaming platform CSV data using Jupyter notebooks. It executed code cells iteratively, viewed results, and customized successive analyses based on findings.

**Tool extensibility**
Claude Code accepts new tool sets. One example used the Playwright MCP server for browser automation — Claude opened a browser, took screenshots, updated UI styling, and iterated on design improvements.

**GitHub integration**
Claude Code runs in GitHub Actions, triggered by pull requests/issues. It gets GitHub-specific tools (comments, commits, PR creation).

**Infrastructure review example**
Terraform-defined AWS infrastructure with a DynamoDB table and S3 bucket shared with an external partner. A developer added user email to a Lambda function output. Claude Code automatically detected the **PII exposure risk** in the pull request review by analyzing infrastructure flow and identifying external data sharing.

### Key Principle

Claude Code = a flexible assistant that grows with team needs through tool expansion rather than fixed functionality.

---

## 3. Adding Context

**Context management** is critical for Claude Code effectiveness. Too much irrelevant info decreases performance.

### `/init` Command

Analyzes the entire codebase on first run and creates a `Claude.md` file with project summary, architecture, and key files. The file's contents are included in every request.

### Three `Claude.md` File Types

| Type | Scope | Committed? |
| ---- | ----- | ---------- |
| **Project** | Shared with team | Yes — committed to source control |
| **Local** | Personal instructions | No |
| **Machine** | Global instructions for all projects | No |

### Context Helpers

- **Memory mode (`#` symbol)** — edit `Claude.md` files intelligently with natural language requests
- **`@` symbol** — mention specific files to include in requests; provides targeted context instead of letting Claude search

### Best Practices

- Reference critical files (like database schemas) in `Claude.md` so they're always available as context
- **Goal:** provide just enough relevant information for Claude to complete tasks effectively

---

## 4. Making Changes

### Screenshot Integration

`Ctrl + V` (**not** `Cmd + V` on macOS) pastes screenshots to help Claude understand specific UI elements to modify.

### Performance-Boosting Modes

**Plan Mode** — `Shift + Tab` twice
Makes Claude research more files and create a detailed implementation plan before executing.

**Thinking Mode** — triggered by phrases like *"ultra think"*
Gives Claude an extended reasoning budget for complex logic.

### Planning vs. Thinking

| Mode | Strength | Best For |
| ---- | -------- | -------- |
| **Planning** | Breadth | Multi-step tasks requiring wide codebase understanding |
| **Thinking** | Depth | Tricky logic or debugging specific issues |

- The two can be **combined** for complex tasks
- Both consume additional tokens (cost consideration)

### Git Integration

Claude Code can stage/commit changes and write descriptive commit messages.

### Key Workflow

1. Screenshot the problematic area
2. Paste with `Ctrl + V`
3. Describe the desired change
4. Optionally enable Plan/Thinking modes for complex tasks
5. Review and accept the implementation

---

## 5. Controlling Context

### Context Control Techniques

**Escape** — stops Claude mid-response to redirect conversation flow. Press once to interrupt current output.

**Escape + Memory** — powerful error prevention. Stop Claude, then add memory about repeated mistakes using the `#` shortcut to prevent future occurrences.

**Double Escape** — conversation rewind. Shows all previous messages and allows jumping back to an earlier point while maintaining relevant context and skipping irrelevant debugging/back-and-forth.

**Compact Command** — summarizes the entire conversation history while preserving Claude's learned knowledge about the current task. Use when Claude has gained expertise but the conversation has accumulated clutter.

**Clear Command** — deletes the entire conversation history for a fresh start. Use when switching to a completely unrelated task.

### Key Benefits

- Maintains focus
- Reduces distracting context
- Preserves relevant knowledge
- Prevents repeated errors
- Most effective for long conversations and task transitions

---

## 6. Custom Commands

**Custom Commands** = user-defined automation commands in Claude Code, accessed via forward slash.

### Setup

| Aspect | Detail |
| ------ | ------ |
| **Location** | `.Claude/commands/` folder in project directory |
| **File naming** | Filename becomes the command name (e.g., `audit.md` → `/audit`) |
| **Activation** | Restart Claude Code after creating command files |

### Command Structure

- A markdown file containing instructions for Claude to execute
- **Arguments:** use `$arguments` placeholder in the command text to accept runtime parameters
- **Argument types:** any string (file paths, descriptive text, etc.)

### Use Cases

- Automating repetitive tasks (dependency auditing, test generation, vulnerability fixes)

### Execution

```
/commandname [optional argument string]
```

---

## 7. Extending Claude Code with MCP Servers

**MCP servers** = external tools that extend Claude Code capabilities; can run locally or remotely.

**Playwright MCP server** = popular server enabling Claude to control browsers for web automation.

### Installation

```bash
claude mcp add [name] [start-command]
```

### Permission Management

- Initial tool usage requires approval
- Auto-approve by adding `MCP__[servername]` to the `settings.local.json` allow array

### Practical Example

Claude used Playwright to navigate `localhost:3000`, generate a UI component, analyze styling quality, then automatically update generation prompts based on visual feedback. The automated prompt refinement produced significantly better component styling — demonstrating how MCP servers unlock sophisticated development workflows.

### Key Benefit

MCP servers enable Claude to perform complex multi-step tasks involving external systems, expanding beyond code editing to full development automation.

---

## 8. GitHub Integration

**Claude Code GitHub Integration** = official integration allowing Claude to run inside GitHub Actions.

### Setup Process

1. Run the `/install GitHub app` command
2. Install the Claude Code app on GitHub
3. Add an API key
4. Auto-generated pull request adds two GitHub Actions

### Default Actions

1. **Mention support** — `@Claude` in issues/PRs to assign tasks
2. **PR review** — automatic code review on new pull requests

### Customization

- Actions are customizable via config files in the `.github/workflows` directory
- **Custom instructions** — direct context/directions passed to Claude
- **MCP server integration** — allows Claude to access external tools (like Playwright for browser automation)

### Permission Requirements

- Must explicitly list all permissions for Claude Code in actions
- MCP server tools require individual permission listing (no shortcuts)

### Example Use Case

- Integrated Playwright MCP server for browser testing
- Development server set up before Claude runs
- Claude can visit the app in a browser, test functionality, create checklists
- Provides automated testing and issue verification

### Key Features

Mention-based task assignment · automated PR reviews · customizable workflows · MCP server integration for extended functionality.

---

## 9. Introducing Hooks

**Hooks** = commands that run before/after Claude executes tools.

### Two Hook Types

**Pre-tool use hooks**
- Run **before** tool execution
- Can inspect and **block** tool operations
- Can send error messages to Claude

**Post-tool use hooks**
- Run **after** tool execution
- Perform follow-up operations
- Provide feedback to Claude

### Configuration

Added to the Claude settings file (global / project / personal) via manual editing or the `/hooks` command.

### Hook Structure

Two sections (pre-tool use, post-tool use), each with:
- A **matcher** (specifies which tools to target)
- **Commands** to execute

### Example Uses

- Auto-format files after creation
- Run tests after edits
- Block file access
- Code quality checks
- Type checking

Hook commands receive tool call details and can modify Claude's workflow through blocking or feedback mechanisms.

---

## 10. Defining Hooks

**Hooks** = mechanisms to intercept and control tool calls before/after execution.

### Hook Types

| Type | When | Can Block? |
| ---- | ---- | ---------- |
| **Pre-tool use** | Before tool call | Yes (exit code 2) |
| **Post-tool use** | After tool call | No |

### Implementation Process

1. Choose hook type (pre vs. post)
2. Identify target tool names to monitor
3. Write a command that receives tool call data via `stdin` as JSON
4. Parse JSON containing `tool_name` and input parameters
5. Exit with the appropriate code to signal intent

### Exit Codes

| Code | Meaning |
| ---- | ------- |
| `0` | Allow tool call to proceed |
| `2` | Block tool call (pre-tool use only) |

Standard error output (`stderr`) = the feedback message sent to Claude when blocking.

### Tool Call Data Structure

JSON object containing:
- `tool_name` (e.g., `"read"`, `"grep"`)
- input parameters (e.g., `file_path`)

### Common Use Case

Blocking file access by monitoring `read` and `grep` tools that can access file contents.

### Tool Discovery

Ask Claude directly for the list of available tool names rather than memorizing them.

### Hook Process Flow

1. Claude sends tool call data as JSON via `stdin` to your command
2. Command parses JSON containing `tool_name` and input arguments
3. Command exits with code `0` (allow) or `2` (block, for pre-hooks only)
4. Exit code `2` sends `stderr` output as feedback to Claude

---

## 11. Implementing a Hook

**Goal:** prevent Claude from reading the `.env` file.

### Configuration Setup

| Setting | Value |
| ------- | ----- |
| **Location** | `.clod/settings.local.json` |
| **Hook type** | Pre-tool use hook (blocks before execution) |
| **Matcher** | `read\|grep` (pipe symbol separates tool names) |
| **Command** | `node ./hooks/read_hook.js` |

### Implementation Details

- Hook receives a JSON object via `stdin` containing: session ID, tool name, tool input, file path
- **Logic:** if file path includes `.env` → exit with code `2` + log error to `stderr`
- Error output goes to `stderr` for Claude feedback
- Exit code `2` = blocked operation

### Implementation Steps

1. Add hook config to `settings.local.json` with matcher and command
2. Create the hook script (e.g., `read_hook.js`) that receives JSON input via `stdin`
3. JSON input contains: session ID, tool name, tool input, file path
4. Script logic: check if file path includes `.env`
5. If a blocked file is detected: `console.error(message)` + `process.exit(2)`
6. Exit code `2` = blocks tool execution

### Key Requirements

- **Must restart Claude** after hook changes
- `console.error()` sends feedback to Claude via `stderr`
- Hook works for both `read` and `grep` tools
- File path checking: `tool_input.path` with fallback handling

### Testing Results

- Successfully blocks `.env` file access
- Claude recognizes the prevention by the read hook
- Works for both read and grep operations

---

## 12. Useful Hooks

**Problem:** Claude Code often misses type errors and creates duplicate code, especially in larger projects.

### Hook 1: TypeScript Type Checker Hook

- **Purpose:** catch type errors immediately after file edits
- **Problem solved:** Claude edits function signatures but doesn't update call sites, causing type errors
- **Implementation:** run `tsc --no-emit` after TypeScript file changes via post-tool-use hook
- **Process:** detects type errors → feeds errors back to Claude → Claude fixes call sites automatically
- **Benefits:** prevents broken function calls when signatures change
- **Adaptable:** works for any typed language with a type checker, or use tests for untyped languages

### Hook 2: Duplicate Code / Query Deduplication Hook

- **Problem:** Claude creates new queries/functions instead of reusing existing ones, especially in complex tasks
- **Cause:** focused tasks work well, but wrapped/complex tasks make Claude lose focus
- **Solution:** launch a separate Claude instance to review changes in specific directories (e.g., a `queries/` folder)

**Process:**

1. Detect edits to the watched directory
2. Launch a new Claude instance via the TypeScript SDK
3. Compare new code against existing code
4. If a duplicate is found, exit with code `2` + feedback
5. Original Claude receives feedback and reuses the existing code

- **Trade-offs:** extra time/cost vs. cleaner codebase
- **Recommendation:** only watch critical directories to minimize overhead

### Key Takeaway

Hooks = **automated feedback loops** that catch common Claude Code weaknesses (type errors, code duplication) by running additional checks and feeding results back to Claude for self-correction.

Both hooks use the post-tool-use pattern to provide immediate feedback and course-correction to Claude's edits.

---

## 13. The Claude Code SDK

**Claude Code SDK** = programmatic interface to use Claude Code via CLI, TypeScript, or Python libraries. Contains the same tools as the terminal version.

### Primary Use Case

Integration into larger pipelines/workflows to add intelligence to existing processes.

### Key Characteristics

- **Default permissions:** read-only (files, directories, grep operations)
- **Write permissions:** must be manually configured via `options.allowTools` array or `.Claude` directory settings
- **Raw conversation output:** shows the message-by-message exchange between local Claude Code and the language model
- **Final response:** the last message in the output

### Implementation Pattern

Add write permissions by specifying tools like `"edit"` in `options.allowTools` when making query calls.

### Best Applications

Helper commands, scripts, and hooks within existing projects — rather than standalone usage.

### Output Format

Conversational messages, with the final response from Claude as the last message.
