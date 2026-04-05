#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
PRE_COMMIT_BIN=""

find_pre_commit() {
  if command -v pre-commit >/dev/null 2>&1; then
    PRE_COMMIT_BIN="$(command -v pre-commit)"
    return 0
  fi
  if [[ -x "${HOME}/.local/bin/pre-commit" ]]; then
    PRE_COMMIT_BIN="${HOME}/.local/bin/pre-commit"
    return 0
  fi
  return 1
}

install_pre_commit_if_missing() {
  if find_pre_commit; then
    echo "pre-commit found: ${PRE_COMMIT_BIN}"
    return 0
  fi

  echo "pre-commit not found. Installing with pip user site..."
  python3 -m pip install --user pre-commit
  if ! find_pre_commit; then
    echo "failed to locate pre-commit after install" >&2
    exit 1
  fi
  echo "pre-commit installed: ${PRE_COMMIT_BIN}"
}

main() {
  cd "${REPO_ROOT}"

  install_pre_commit_if_missing

  echo "syncing .claude/commands compatibility prompts..."
  bash codex/scripts/install_claude_commands_as_prompts.sh

  echo "installing git hooks..."
  "${PRE_COMMIT_BIN}" install
  "${PRE_COMMIT_BIN}" install --hook-type pre-push

  echo "running full pre-commit checks (skip protected-branch commit guard)..."
  SKIP=no-commit-to-branch "${PRE_COMMIT_BIN}" run --all-files

  echo
  echo "Bootstrap completed."
  echo "Try these prompt commands in Codex:"
  echo "  /prompts:req-phase1"
  echo "  /prompts:req-phase2"
  echo "  /prompts:req-phase3"
}

main "$@"
