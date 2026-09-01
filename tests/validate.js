const fs = require("fs");
const vm = require("vm");

const code = fs.readFileSync("js/puzzles.js", "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(code, sandbox);

const puzzles = sandbox.window.PIPO_PUZZLES;
const terminal = sandbox.window.PIPO_TERMINAL;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function normalize(value, mode) {
  const clean = String(value || "").trim().toLowerCase();
  if (mode === "date") return clean.replace(/[^\d]/g, "");
  return clean.replace(/[^a-z0-9]/g, "");
}

assert(Array.isArray(puzzles), "Puzzle list must exist");
assert(puzzles.length >= 8, "Expected at least eight stages including final");
assert(new Set(puzzles.map((p) => p.id)).size === puzzles.length, "Puzzle ids must be unique");

puzzles.forEach((puzzle) => {
  assert(puzzle.id, "Puzzle missing id");
  assert(puzzle.title, `${puzzle.id} missing title`);
  assert(puzzle.progress, `${puzzle.id} missing progress label`);
  assert(Array.isArray(puzzle.intro), `${puzzle.id} missing intro lines`);
  if (puzzle.type !== "final") {
    assert(Array.isArray(puzzle.hints) && puzzle.hints.length > 0, `${puzzle.id} missing hints`);
  }
});

const expected = {
  auth: "pipo",
  signal: "lisa",
  decoder: "chill",
  security: "14042025",
  logic: "c",
  memory: "chill"
};

Object.entries(expected).forEach(([id, answer]) => {
  const puzzle = puzzles.find((candidate) => candidate.id === id);
  assert(puzzle, `Missing puzzle ${id}`);
  const answers = puzzle.answer.map((item) => normalize(item, puzzle.normalize));
  assert(answers.includes(answer), `${id} does not accept ${answer}`);
});

const binaryPuzzle = puzzles.find((puzzle) => puzzle.id === "decoder");
const binaryLine = binaryPuzzle.intro.find((line) => line.startsWith("010"));
const ascii = binaryLine.split(" ").map((byte) => String.fromCharCode(parseInt(byte, 2))).join("");
assert(ascii === "FKLOO", `Decoder binary should produce FKLOO, got ${ascii}`);

assert(terminal.files["signal.enc"].includes("c2NhbiB0byBiZWdpbg=="), "Missing base64 terminal payload");
assert(Object.keys(terminal.easterEggs).length >= 5, "Expected at least five easter eggs");
assert(code.includes('GAME_URL_PLACEHOLDER'), "QR placeholder constant missing");

console.log("Validation passed.");
