const { console, core, input, mpv, overlay } = iina

overlay.simpleMode()
overlay.setStyle(`
  .seek-indicator {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    padding: 20px 30px;
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    font-family: --apple-system, BlinkMacSystemFont, "Inter V";
    font-size: 48px;
    font-weight: bold;
    color: white;
    font-variant-numeric: tabular-nums;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  }
  .seek-indicator.left {
    left: 40px;
  }
  .seek-indicator.right {
    right: 40px;
  }
  .seek-indicator.visible {
    opacity: 1;
  }
`)
overlay.setContent(`
  <div id="seek-left" class="seek-indicator left"></div>
  <div id="seek-right" class="seek-indicator right"></div>
`)
overlay.show()
overlay.setClickable(false)

const DEBOUNCE_TIMEOUT = 300

let seekBuffer = 0
let seekTimeout = null
let lastSeekDirection = null

function showSeekIndicator(direction, amount) {
  const sign = direction > 0 ? '+' : ''
  const elementId = direction > 0 ? 'seek-right' : 'seek-left'

  overlay.postMessage({
    type: 'updateSeek',
    elementId,
    text: `${sign}${amount}`,
    show: true,
  })

  // Clear existing timeout
  if (seekTimeout) {
    clearTimeout(seekTimeout)
  }

  // Hide after delay and execute seek
  seekTimeout = setTimeout(() => {
    overlay.postMessage({
      type: 'updateSeek',
      elementId,
      show: false,
    })

    // Execute the buffered seek
    if (seekBuffer !== 0) {
      core.seek(seekBuffer)
      seekBuffer = 0
      lastSeekDirection = null
    }
  }, DEBOUNCE_TIMEOUT)
}

overlay.loadFile = null

function updateOverlaySeek(elementId, text, show) {
  const content = `
    <div id="seek-left" class="seek-indicator left ${
      elementId === 'seek-left' && show ? 'visible' : ''
    }">
      ${elementId === 'seek-left' ? `${text}s` : ''}
    </div>
    <div id="seek-right" class="seek-indicator right ${
      elementId === 'seek-right' && show ? 'visible' : ''
    }">
      ${elementId === 'seek-right' ? `${text}s` : ''}
    </div>
  `
  overlay.setContent(content)
}

// 0-9 keys: seek to percentage
for (let i = 0; i <= 9; i++) {
  input.onKeyDown(String(i), () => {
    const duration = mpv.getNumber('duration')
    if (duration) {
      const targetTime = (i / 10) * duration
      core.seekTo(targetTime)
    }
    return true
  })
}

// j: -10s with buffering
input.onKeyDown('j', () => {
  if (lastSeekDirection !== -1) {
    seekBuffer = -10
    lastSeekDirection = -1
  } else {
    seekBuffer -= 10
  }

  updateOverlaySeek('seek-left', String(seekBuffer), true)

  // Clear existing timeout
  if (seekTimeout) {
    clearTimeout(seekTimeout)
  }

  // Hide after delay and execute seek
  seekTimeout = setTimeout(() => {
    updateOverlaySeek('seek-left', '', false)

    if (seekBuffer !== 0) {
      core.seek(seekBuffer)
      seekBuffer = 0
      lastSeekDirection = null
    }
  }, DEBOUNCE_TIMEOUT)

  return true
})

// k: play/pause
input.onKeyDown('k', () => {
  const paused = mpv.getFlag('pause')
  if (paused) {
    core.resume()
  } else {
    core.pause()
  }
  return true
})

// l: +10s with buffering
input.onKeyDown('l', () => {
  if (lastSeekDirection !== 1) {
    seekBuffer = 10
    lastSeekDirection = 1
  } else {
    seekBuffer += 10
  }

  updateOverlaySeek('seek-right', '+' + String(seekBuffer), true)

  // Clear existing timeout
  if (seekTimeout) {
    clearTimeout(seekTimeout)
  }

  // Hide after delay and execute seek
  seekTimeout = setTimeout(() => {
    updateOverlaySeek('seek-right', '', false)

    if (seekBuffer !== 0) {
      core.seek(seekBuffer)
      seekBuffer = 0
      lastSeekDirection = null
    }
  }, DEBOUNCE_TIMEOUT)

  return true
})

// <: -1 frame (when paused)
input.onKeyDown('<', () => {
  const paused = mpv.getFlag('pause')
  if (paused) {
    mpv.command('frame-back-step', [])
    return true
  }
  return false
})

// >: +1 frame (when paused)
input.onKeyDown('>', () => {
  const paused = mpv.getFlag('pause')
  if (paused) {
    mpv.command('frame-step', [])
    return true
  }
  return false
})
