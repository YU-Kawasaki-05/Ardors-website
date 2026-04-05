# Codex Setup Notes

This repository has been prepared from `codex-template-kit` with project-specific and productivity-focused adjustments.

## Applied
- `AGENTS.md` with docs-first workflow + verification expectations.
- `.codex/` active config (profiles, hooks, subagents).
- `.codex-state/` runtime hook artifacts (ignored by git).
- `codex/rules/default.rules` with faster `gh` read rules and stronger destructive guards.
- `.agents/skills/` as canonical skill location.
- `skills -> .agents/skills` symlink for compatibility.
- `docs/AGENTS.override.md` hierarchy for docs-focused context layering.
- Community-inspired skills added as local variants:
  - `create-plan`
  - `gh-fix-ci`
  - `connect-actions`
- Layered safety controls for command execution:
  - Codex rules (`codex/rules/default.rules`)
  - PreToolUse guard hook (`.codex/hooks/check_bash_command.py`)
  - Git local hooks via pre-commit (`.pre-commit-config.yaml`)

## Active Codex directories
- `.codex/`
  - `config.toml`
  - `hooks.json`
  - `hooks/*.py`
  - `agents/*.toml`
- `.codex-state/`
  - `last_stop_summary.txt` (generated at stop hook)
- `.agents/skills/`
  - project skills and reusable workflows

## Profile usage
- Default profile: balanced quality (`gpt-5.4`, medium reasoning).
- Fast profile: `codex --profile fast`
- Review profile: `codex --profile review`
- Explore profile: `codex --profile explore`

## Verification helpers
- Backend verification entry:
  - `./.agents/skills/backend-bugfix/scripts/verify.sh`
- CI triage helper:
  - `./.agents/skills/gh-fix-ci/scripts/collect_failed_checks.py --pr <number>`

## Command approval policy (current)
- `git push` (feature branches) -> `allow`
- `git push origin main|master` -> `prompt`
- `git push --force` -> `forbidden`
- `rm *` -> `prompt`
- `sudo rm -rf *` -> `forbidden`
- protected branch plain push (`git push` / `git push origin` while on `main|master`) -> `deny` by hook, requires explicit refspec

## Local git guardrails (pre-commit)
- Config file: `/.pre-commit-config.yaml`
- Hooks introduced:
  - `no-commit-to-branch` for `main/master` protection
  - `detect-private-key`
  - `check-merge-conflict`, `check-yaml`, `check-toml`
  - `check-added-large-files`, `end-of-file-fixer`, `trailing-whitespace`
  - local `pre-push` hook to block direct push to `main/master`

### Enable commands
```bash
pipx install pre-commit  # or: pip install pre-commit
cd /home/yukawasaki/develop/Ardors-website
pre-commit install
pre-commit install --hook-type pre-push
pre-commit run --all-files
```

## Recovery (optional)
If you want to re-apply from the archived template:
1. Review `docs/00_共通/codex/codex-template-kit/`.
2. Copy needed files into repo root paths (`.codex/`, `.agents/skills/`, `codex/rules/`).
