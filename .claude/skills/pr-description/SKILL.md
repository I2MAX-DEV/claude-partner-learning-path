---
name: pr-description
description: Generates pull request descriptions based on code changes. Use when creating PR, writing a PR, or when the user asks to summarize changes for a pull request. 
--- 


When writing a PR description:

1. Run 'git diff main ...HEAD' to see all changes on the current branch.
2. Write a description following this format:

## What
One  sentence explanation of what the PR does.

## Why
Brief context on why this is needed. 

## Changes
- Bullet points of specific changes made
- Group related changes together
- Mention any fields deleted or renamed

## Testing
How to verify this works. Include specific commands if relevant.


Keep descriptions concise. Focus on what a reviewer needs to know. 



