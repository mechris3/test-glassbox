---
inclusion: manual
---

# Commit Message Preparation

When asked to prepare a commit message:

1. Analyse all changes since the last commit (`git diff --cached` or `git diff` depending on what's staged).
2. Produce two independently copyable blocks:

## Summary (first line)

- Concise, imperative mood (e.g. "Add CDP connection module" not "Added...")
- Max 72 characters
- Describes *what* changed at a high level

## Description (body)

- Describes the changes made in more detail
- Explains *why* the changes were made and *what* they support
- Groups related changes logically (don't just list files)
- Mentions any architectural decisions or trade-offs if relevant
- Uses bullet points for multiple distinct changes

## Format

Present them like this so they're easy to copy separately:

**Summary:**
```
<one-line summary here>
```

**Description:**
```
<multi-line description here>
```
