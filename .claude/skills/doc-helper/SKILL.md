---
name: doc-helper
description: Assists with documentation tasks such as writing or reviewing docs. Use when creating or improving documentation, or when the user asks for help with docs.
allowed-tools: Read, Grep, Glob, Bash
model: sonnet
---

Before writing or reviewing documentation, read all files in the `references/` folder relative to this skill for style guides and tool references.

When writing documentation:

1. Gather context:
   - Read the source code for the feature being documented.
   - Check existing docs for style, tone, and structure patterns.
   - Read files in `references/` for any relevant tool or API details.

2. Follow these principles:
   - Write for the reader, not the author. Assume minimal prior context.
   - Lead with what the user needs to do, then explain why.
   - Use short sentences and active voice.
   - Include concrete examples for any non-trivial concept.
   - Use consistent terminology — don't alternate between synonyms.

3. Structure:
   - Start with a one-line summary of what the feature does.
   - Follow with a quick-start or usage example.
   - Add detailed explanations only after the basics are covered.
   - End with edge cases, limitations, or related links if relevant.

When reviewing documentation:
   - Check for accuracy against the current codebase.
   - Flag outdated references, broken links, or missing steps.
   - Suggest simplifications where language is overly complex.
   - Verify code examples actually work.