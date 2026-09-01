(function () {
  const STORAGE_KEY = "pipo.deep.space.signal.v1";
  const puzzles = window.PIPO_PUZZLES;
  const terminalSpec = window.PIPO_TERMINAL;

  const state = {
    current: 0,
    completed: [],
    hints: {},
    attempts: {},
    terminalHistory: []
  };

  let elements = {};

  function initGame(dom) {
    elements = dom;
    load();
    bindGlobalControls();
    renderProgress();
    renderLevel();
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      Object.assign(state, saved);
    } catch (error) {
      console.warn("Save restore failed", error);
    }
    if (!Number.isInteger(state.current) || state.current < 0 || state.current >= puzzles.length) state.current = 0;
    if (!Array.isArray(state.completed)) state.completed = [];
    state.hints = state.hints || {};
    state.attempts = state.attempts || {};
    state.terminalHistory = state.terminalHistory || [];
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    elements.saveStatus.textContent = "SAVED";
    setTimeout(() => {
      if (elements.saveStatus) elements.saveStatus.textContent = "SAVE READY";
    }, 800);
  }

  function bindGlobalControls() {
    elements.hintButton.addEventListener("click", showHint);
    elements.audioButton.addEventListener("click", () => {
      const enabled = window.PipoAudio.toggle();
      elements.audioStatus.textContent = enabled ? "AUDIO ON" : "AUDIO OFF";
      elements.audioButton.classList.toggle("active", enabled);
      if (enabled) window.PipoAudio.ok();
    });
    elements.resetButton.addEventListener("click", () => elements.resetDialog.showModal());
    elements.confirmReset.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      state.current = 0;
      state.completed = [];
      state.hints = {};
      state.attempts = {};
      state.terminalHistory = [];
      renderProgress();
      renderLevel();
    });
  }

  function currentPuzzle() {
    return puzzles[state.current];
  }

  function renderProgress() {
    const completedCount = state.completed.length;
    elements.progressFill.style.width = `${Math.round((completedCount / puzzles.length) * 100)}%`;
    elements.clearanceReadout.textContent = `${completedCount}/${puzzles.length}`;
    elements.sourceReadout.textContent = state.current >= puzzles.length - 1 ? "LISA" : "UNKNOWN";
    elements.progressList.innerHTML = puzzles.map((puzzle, index) => {
      const done = state.completed.includes(puzzle.id);
      const active = index === state.current;
      return `<li class="${done ? "done" : ""} ${active ? "active" : ""}">
        <span>${done ? "✓" : active ? ">" : " "}</span>
        <b>${puzzle.progress}</b>
      </li>`;
    }).join("");
  }

  function renderLevel() {
    const puzzle = currentPuzzle();
    elements.levelLabel.textContent = puzzle.title;
    elements.attemptsLabel.textContent = `ATTEMPTS: ${state.attempts[puzzle.id] || 0}`;
    elements.hintButton.disabled = puzzle.type === "final";
    elements.gameView.innerHTML = "";

    const output = document.createElement("div");
    output.className = "terminal-output";
    output.innerHTML = lines(puzzle.intro);
    elements.gameView.appendChild(output);

    if (puzzle.custom === "starMap") renderStarPuzzle();
    if (puzzle.type === "terminal") return renderTerminal(puzzle);
    if (puzzle.type === "button") return renderButtonPuzzle(puzzle);
    if (puzzle.type === "final") return renderFinal();
    renderInputPuzzle(puzzle);
  }

  function lines(items) {
    return items.map((line) => `<p>${escapeHtml(line) || "&nbsp;"}</p>`).join("");
  }

  function renderInputPuzzle(puzzle) {
    const form = document.createElement("form");
    form.className = "answer-row";
    form.innerHTML = `
      <label>
        <span>${escapeHtml(puzzle.label)}</span>
        <input type="text" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="${escapeHtml(puzzle.label)}">
      </label>
      <button type="submit">Transmit</button>
    `;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input");
      checkAnswer(input.value);
      input.value = "";
      input.focus();
    });
    elements.gameView.appendChild(form);
    form.querySelector("input").focus();
  }

  function renderButtonPuzzle(puzzle) {
    const wrap = document.createElement("div");
    wrap.className = "button-stage";
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = puzzle.buttonText;
    button.addEventListener("click", () => runHypnosis(button));
    wrap.appendChild(button);
    elements.gameView.appendChild(wrap);
  }

  function renderFinal() {
    const message = document.createElement("div");
    message.className = "final-message";
    message.innerHTML = `
      <h2>SIGNAL IDENTIFIED.</h2>
      <p>I searched through the entire universe<br>for the source of this signal.</p>
      <p>Turns out,<br>I didn't need a telescope.</p>
      <p>It was you.</p>
      <p><strong>14.04.2025</strong></p>
      <p>That was the day I told you how I felt.</p>
      <p>You answered:</p>
      <p class="quote">"chill"</p>
      <p>And somehow,<br>that was the beginning of everything.</p>
      <p class="signature">Happy 14.04, Pipo.<br>Lisa</p>
    `;
    elements.gameView.appendChild(message);
    if (!state.completed.includes("final")) completeCurrent(false);
    window.PipoAudio.final();
  }

  function runHypnosis(button) {
    button.disabled = true;
    const log = document.createElement("div");
    log.className = "terminal-output staged";
    elements.gameView.appendChild(log);
    const script = [
      "Initializing...",
      "3",
      "2",
      "1",
      "Your hand is becoming...",
      "very...",
      "very...",
      "heavy...",
      "",
      "ERROR.",
      "SUBJECT RESISTANCE DETECTED.",
      "",
      "HYPNOSIS MODULE FAILED.",
      "Reason:",
      "Pipo's girlfriend is too powerful.",
      "",
      "(or maybe you just blinked.)"
    ];
    let i = 0;
    const timer = setInterval(() => {
      log.innerHTML += `<p>${escapeHtml(script[i]) || "&nbsp;"}</p>`;
      window.PipoAudio.beep();
      i += 1;
      if (i >= script.length) {
        clearInterval(timer);
        setTimeout(() => completeCurrent(), 650);
      }
    }, 330);
  }

  function renderStarPuzzle() {
    const map = document.createElement("div");
    map.className = "star-map";
    map.setAttribute("aria-label", "Coordinate star map with four highlighted nodes");
    const nodes = [
      [2, 8, "", false], [4, 4, "", false], [6, 11, "", false], [8, 3, "", false],
      [12, 5, "01  x=12 y=5", true], [9, 7, "02  x=9 y=7", true],
      [19, 4, "03  x=19 y=4", true], [1, 9, "04  x=1 y=9", true],
      [15, 10, "", false], [21, 6, "", false], [24, 2, "", false]
    ];
    nodes.forEach(([x, y, label, marked]) => {
      const star = document.createElement("span");
      star.className = marked ? "map-star marked" : "map-star";
      star.style.left = `${(x / 26) * 100}%`;
      star.style.top = `${(y / 12) * 100}%`;
      if (label) star.dataset.label = label;
      map.appendChild(star);
    });
    elements.gameView.appendChild(map);
  }

  function renderTerminal(puzzle) {
    const terminal = document.createElement("div");
    terminal.className = "mini-terminal";
    terminal.innerHTML = `
      <div id="terminalScreen" class="terminal-screen"></div>
      <form class="terminal-input">
        <span>$</span>
        <input type="text" autocomplete="off" autocapitalize="none" spellcheck="false" aria-label="Terminal command">
        <button type="submit">Run</button>
      </form>
    `;
    elements.gameView.appendChild(terminal);
    const screen = terminal.querySelector("#terminalScreen");
    const input = terminal.querySelector("input");
    if (!state.terminalHistory.length) {
      state.terminalHistory.push("Deep space sandbox ready. Type help.");
    }
    renderTerminalHistory(screen);
    terminal.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      const command = input.value.trim();
      input.value = "";
      runCommand(command, screen);
      if (command.toLowerCase() === puzzle.answer[0]) {
        setTimeout(() => completeCurrent(), 450);
      }
    });
    input.focus();
  }

  function renderTerminalHistory(screen) {
    screen.innerHTML = state.terminalHistory.map((entry) => `<p>${escapeHtml(entry).replace(/\n/g, "<br>")}</p>`).join("");
    screen.scrollTop = screen.scrollHeight;
  }

  function runCommand(raw, screen) {
    const command = raw.replace(/\s+/g, " ").trim();
    const lower = command.toLowerCase();
    if (!command) return;
    state.terminalHistory.push(`$ ${command}`);
    window.PipoAudio.beep();

    if (lower === "clear") {
      state.terminalHistory = [];
      renderTerminalHistory(screen);
      save();
      return;
    }

    let response = "";
    if (terminalSpec.easterEggs[lower]) response = terminalSpec.easterEggs[lower];
    else if (lower === "help") response = "Commands: ls, cat <file>, decode signal.enc, whoami, uptime, clear, help";
    else if (lower === "ls") response = "README.txt  access.log  notes.txt  signal.enc\n.hidden entries require ls -a";
    else if (lower === "ls -a") response = ".  ..  .secret  README.txt  access.log  notes.txt  signal.enc";
    else if (lower === "whoami") response = "pipo";
    else if (lower.startsWith("cat ")) response = catFile(command.slice(4).trim());
    else if (lower === "decode signal.enc") response = "signal.enc decoded:\nscan to begin\n\nLaunch phrase accepted.";
    else if (lower.startsWith("decode ")) response = "Decoder cannot lock onto that file.";
    else response = `${command}: command not found`;

    state.terminalHistory.push(response);
    renderTerminalHistory(screen);
    save();
  }

  function catFile(name) {
    if (terminalSpec.files[name]) return terminalSpec.files[name];
    return `cat: ${name}: No such file`;
  }

  function showHint() {
    const puzzle = currentPuzzle();
    if (!puzzle.hints.length) return;
    const index = state.hints[puzzle.id] || 0;
    const hint = puzzle.hints[Math.min(index, puzzle.hints.length - 1)];
    state.hints[puzzle.id] = Math.min(index + 1, puzzle.hints.length);
    appendMessage(`[HINT ${Math.min(index + 1, puzzle.hints.length)}]\n${hint}`, "hint");
    window.PipoAudio.beep();
    save();
  }

  function checkAnswer(value) {
    const puzzle = currentPuzzle();
    state.attempts[puzzle.id] = (state.attempts[puzzle.id] || 0) + 1;
    elements.attemptsLabel.textContent = `ATTEMPTS: ${state.attempts[puzzle.id]}`;
    const normalized = normalize(value, puzzle.normalize);
    const answers = puzzle.answer.map((answer) => normalize(answer, puzzle.normalize));
    if (answers.includes(normalized)) {
      appendMessage(puzzle.success, "success");
      window.PipoAudio.ok();
      setTimeout(() => completeCurrent(), 650);
    } else {
      const wrong = puzzle.wrong[(state.attempts[puzzle.id] - 1) % puzzle.wrong.length];
      appendMessage(wrong, "error");
      window.PipoAudio.error();
      save();
    }
  }

  function normalize(value, mode) {
    const clean = String(value || "").trim().toLowerCase();
    if (mode === "date") return clean.replace(/[^\d]/g, "");
    return clean.replace(/[^a-z0-9]/g, "");
  }

  function completeCurrent(playAudio = true) {
    const puzzle = currentPuzzle();
    if (!state.completed.includes(puzzle.id)) state.completed.push(puzzle.id);
    if (state.current < puzzles.length - 1) state.current += 1;
    save();
    renderProgress();
    if (playAudio) window.PipoAudio.ok();
    setTimeout(renderLevel, 500);
  }

  function appendMessage(text, className) {
    const message = document.createElement("div");
    message.className = `system-message ${className || ""}`;
    message.innerHTML = escapeHtml(text).replace(/\n/g, "<br>");
    elements.gameView.appendChild(message);
    message.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  window.PipoGame = { initGame, state, normalize };
})();
