document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");
  const stars = [];

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    seedStars();
  }

  function seedStars() {
    stars.length = 0;
    const count = Math.min(140, Math.floor((window.innerWidth * window.innerHeight) / 7200));
    for (let i = 0; i < count; i += 1) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.45 + 0.15
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    stars.forEach((star) => {
      ctx.fillStyle = `rgba(182, 245, 255, ${star.a})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);

  window.PipoGame.initGame({
    gameView: document.getElementById("gameView"),
    progressList: document.getElementById("progressList"),
    progressFill: document.getElementById("progressFill"),
    levelLabel: document.getElementById("levelLabel"),
    attemptsLabel: document.getElementById("attemptsLabel"),
    hintButton: document.getElementById("hintButton"),
    audioButton: document.getElementById("audioButton"),
    resetButton: document.getElementById("resetButton"),
    resetDialog: document.getElementById("resetDialog"),
    confirmReset: document.getElementById("confirmReset"),
    audioStatus: document.getElementById("audioStatus"),
    saveStatus: document.getElementById("saveStatus"),
    sourceReadout: document.getElementById("sourceReadout"),
    clearanceReadout: document.getElementById("clearanceReadout")
  });
});
