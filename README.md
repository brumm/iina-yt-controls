# YouTube Controls for IINA

YouTube-style keyboard controls for the [IINA](https://iina.io) video player.

## Features

### Percentage Seeking (0-9)
Jump to any point in the video by pressing number keys:
- `0` = 0% (start)
- `5` = 50% (middle)
- `9` = 90%

### Buffered Seeking (j/l)
- `j` = seek backward 10s
- `l` = seek forward 10s

Press multiple times quickly to accumulate: `l l l` = +30s

Visual indicator appears on screen showing buffered amount.

### Play/Pause (k)
- `k` = toggle play/pause

### Frame Stepping (</>)
When paused:
- `<` = previous frame
- `>` = next frame

## Installation

1. Download or clone this repository
2. Run `pnpm install && pnpm run build`
3. Symlink or copy to IINA plugins folder:
   ```bash
   ln -s /path/to/iina-yt-controls ~/Library/Application\ Support/IINA/Plugins/iina-yt-controls.iinaplugin
   ```
4. Restart IINA

## Development

```bash
pnpm install
pnpm run build
```

For development, use `.iinaplugin-dev` suffix:
```bash
ln -s /path/to/iina-yt-controls ~/Library/Application\ Support/IINA/Plugins/iina-yt-controls.iinaplugin-dev
```

## License

ISC
