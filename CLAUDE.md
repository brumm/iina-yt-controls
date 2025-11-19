# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

IINA plugin for YouTube playback controls. Built as JavaScript plugin targeting Safari 9+ via Parcel bundler. Uses JavaScriptCore engine (Safari's JS engine, not browser DOM).

## Build & Development

- **Build**: `pnpm run build` - clears dist/, bundles via Parcel
- **Dev setup**: Symlink to `~/Library/Application Support/IINA/Plugins/iina-yt-controls.iinaplugin-dev` then restart IINA
- **Package manager**: pnpm (not npm)
- **Bundler**: Parcel with custom `parcel-optimizer-webview` for IINA webview optimization
- **Bundle target**: `src/index.js` → `dist/index.js`
- **Testing**: Use IINA's Window > Log Viewer (subsystem: `player<id> - <plugin name>`) or Plugin > Developer Tool (JS console)

## Plugin Architecture

### Context and Execution
- **Main entry** (`src/index.js`): Executes in player context. Separate instance per player window. Entry runs before video loads.
- **Runtime operations**: Use event listeners (e.g., `mpv.file-loaded`) since entry executes before playback starts

### Manifest (Info.json)
- Entry: `dist/index.js` (built from `src/index.js`)
- Permissions: show-osd, show-alert, video-overlay, network-request, file-system
- All domains allowed (`allowedDomains: ["*"]`)
- For GitHub distribution: Add `ghRepo` (username/repo) and `ghVersion` (integer)

### IINA API (via global `iina` object)
Key modules:
- `iina.core` - playback control (pause/resume/stop, seek, setSpeed, open, osd messages)
- `iina.event` - event system (`on(event, callback)` returns ID, `off(event, id)` removes)
- `iina.mpv` - direct mpv API access
- `iina.console` - logging
- `iina.menu` - menu customization
- `iina.overlay` - video overlay UI
- `iina.http` / `iina.ws` - network (no browser `fetch` available)
- `iina.file` / `iina.utils` - file system and utilities

### Events
- IINA events: `iina.window-loaded`, `iina.file-loaded`, `iina.file-started`, etc.
- mpv events: prefix with `mpv.` (e.g., `mpv.end-file`)
- Property changes: append `.changed` (e.g., `mpv.volume.changed`)

## JavaScript Environment

- JavaScriptCore (Safari engine), ES6 baseline
- No browser DOM APIs - use IINA equivalents
- Can use `require()` for simple imports or Parcel for ES6 modules
- TypeScript support via `iina-plugin-definition` package

## Distribution

Commit bundled `dist/` to repo - IINA downloads GitHub repo contents directly for plugin installation.
