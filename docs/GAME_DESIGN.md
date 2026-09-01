# Game Design

## Intent

`PIPO // DEEP SPACE SIGNAL` is a personal CTF-style mini escape room for smartphone.

The first impression should feel technical: Linux terminal, observatory telemetry, signal decoding, fake logs, logic, and a controlled sandbox. The romantic meaning arrives late, after Pipo has already accepted the fiction as a small real system.

## Tone

- Nerdy
- Mysterious
- Dryly funny
- Technical at first
- Affectionate only near the end

Avoid pink romantic styling, heavy sentimentality, or anything that makes the reveal obvious too early.

## Level Flow

1. `BOOT // AUTHENTICATION`: enter callsign `PIPO`.
2. `SIGNAL DETECTION`: read marked star x coordinates and convert to letters.
3. `ENCODING LAYER`: binary to ASCII, then Caesar shift.
4. `SECURITY LOG`: reconstruct `14.04.2025` from SSH-style log fragments.
5. `LOGIC CORE`: solve a unique one-true-statement server puzzle.
6. `TERMINAL SANDBOX`: explore fake files and run `decode signal.enc`.
7. `NEURAL INTERFACE`: hypnosis inside joke that fails.
8. `THE BEACH`: memory file reveals beach, confession, and `chill`.
9. `FINAL`: source is Lisa.

## UX Rules

- Every real puzzle has hints.
- Wrong answers give feedback without punishing the player.
- Progress is saved in `localStorage`.
- Reset requires confirmation.
- Audio is optional and procedural.
- The game remains playable with animations disabled.

## Security Note

The terminal is a fully simulated toy. It does not run shell commands, access the host machine, collect data, or communicate with any server.
