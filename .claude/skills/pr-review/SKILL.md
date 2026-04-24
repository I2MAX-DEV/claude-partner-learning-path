---
name: pr-review
description: Reviews pull requests for code quality. Use when reviewing PRs or checking code changes.
---

When reviewing a pull request:

1. Gather context:
   - Run `git diff main...HEAD` to see all changes on the current branch.
   - Run `git log main..HEAD --oneline` to understand the commit history.
   - Read modified files in full to understand surrounding context.

2. Review for the following categories:

## Correctness
- Logic errors, off-by-one mistakes, wrong comparisons
- Missing null/undefined checks at system boundaries
- Race conditions or concurrency issues
- Unhandled error paths or edge cases

## Security
- Injection vulnerabilities (SQL, XSS, command injection)
- Hardcoded secrets, credentials, or API keys
- Improper input validation or sanitization
- Insecure dependencies or configurations

## Performance
- Unnecessary loops, redundant computations, or N+1 queries
- Missing indexes for new database queries
- Large allocations or memory leaks
- Blocking calls in async contexts

## Readability & Maintainability
- Unclear variable or function names
- Overly complex logic that could be simplified
- Dead code or unused imports
- Missing context where intent is non-obvious

## Testing
- Are new code paths covered by tests?
- Do tests assert meaningful behavior, not implementation details?
- Are edge cases tested?

3. Format your review as:

### Summary
One sentence overall assessment: approve, request changes, or comment.

### Issues
List each issue found with:
- **File and line**: `path/to/file.ts:42`
- **Severity**: critical / warning / nit
- **Problem**: What is wrong
- **Suggestion**: How to fix it

### What looks good
Briefly note things done well. Positive feedback reinforces good patterns.

4. Guidelines:
- Be specific. Quote the problematic code.
- Suggest fixes, not just problems.
- Distinguish blocking issues (critical) from suggestions (nit).
- Do not nitpick formatting if a linter/formatter is configured.
- Do not suggest changes unrelated to the PR's purpose.
- Keep the review concise and actionable.
