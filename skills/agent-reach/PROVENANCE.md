# Provenance — agent-reach skill

This skill is **vendored third-party content**, not an original Superpowers skill.

| | |
|---|---|
| Upstream project | [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) |
| Upstream version | 1.5.0 |
| Upstream commit | `94f06c1969dfc1834001269d79d3ad0972d9dee6` |
| Upstream path | `agent_reach/skill/` |
| License | MIT (see `LICENSE` in this directory) |
| Vendored on | 2026-10-18 |

## Files

| Local file | Upstream source | Notes |
|---|---|---|
| `SKILL.md` | `agent_reach/skill/SKILL_en.md` | Copied verbatim (English variant) |
| `references/*.md` | `agent_reach/skill/references/*.md` | Copied verbatim; prose is Chinese, commands are universal |
| `LICENSE` | `LICENSE` | Upstream MIT license, required for redistribution |

`agent_reach/skill/SKILL.md` upstream is the Chinese variant; it was not copied.

## Runtime dependency

The skill is a **router document only**. Most of its commands need external
CLIs that are *not* bundled with this repository:

- `agent-reach` — the router/doctor/installer itself (Python ≥ 3.10)
- `opencli`, `twitter-cli`, `bili-cli`, `rdt-cli`, `boss`, `yt-dlp`, `mcporter`, `gh`

Install the router with:

```bash
pipx install https://github.com/Panniantong/agent-reach/archive/main.zip
agent-reach install --env=auto          # read-only dependency check
agent-reach doctor --json               # which backend serves each platform
```

Zero-config channels (Jina Reader, `gh`, V2EX API, `yt-dlp` subtitles) work
without the router installed.

This is a deliberate exception to Superpowers' zero-dependency core policy —
it lives in this fork and should not be proposed upstream (see `AGENTS.md`:
"Third-party dependencies" and "Domain-specific skills").

## Re-syncing from upstream

```bash
git clone --depth 1 https://github.com/Panniantong/Agent-Reach.git /tmp/agent-reach
cp /tmp/agent-reach/agent_reach/skill/SKILL_en.md skills/agent-reach/SKILL.md
cp /tmp/agent-reach/agent_reach/skill/references/*.md skills/agent-reach/references/
cp /tmp/agent-reach/LICENSE skills/agent-reach/LICENSE
```

Then update the commit SHA and version in the table above.
