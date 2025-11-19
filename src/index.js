const {
  console,
  core,
  input,
  mpv,
} = iina;

console.log("YouTube Controls Plugin loaded");

// 0-9 keys: seek to percentage
for (let i = 0; i <= 9; i++) {
  input.onKeyDown(String(i), () => {
    const duration = mpv.getNumber("duration");
    if (duration) {
      const targetTime = (i / 10) * duration;
      core.seekTo(targetTime);
      core.osd(`${i * 10}%`);
    }
    return true;
  });
}

// j: -10s
input.onKeyDown("j", () => {
  core.seek(-10);
  return true;
});

// k: play/pause
input.onKeyDown("k", () => {
  const paused = mpv.getFlag("pause");
  if (paused) {
    core.resume();
  } else {
    core.pause();
  }
  return true;
});

// l: +10s
input.onKeyDown("l", () => {
  core.seek(10);
  return true;
});

// <: -1 frame (when paused)
input.onKeyDown("<", () => {
  const paused = mpv.getFlag("pause");
  if (paused) {
    mpv.command("frame-back-step", []);
    return true;
  }
  return false;
});

// >: +1 frame (when paused)
input.onKeyDown(">", () => {
  const paused = mpv.getFlag("pause");
  if (paused) {
    mpv.command("frame-step", []);
    return true;
  }
  return false;
});
