# Puzzle Solutions

This file is for Lisa. Do not give it to Pipo before he plays.

## 0. Authentication

Answer: `PIPO`

The boot screen identifies the target as Pipo. The callsign is the target name.

## 1. Signal Detection

Answer: `LISA`

The marked stars show x coordinates:

```text
12, 9, 19, 1
```

Using A1Z26:

```text
12=L, 9=I, 19=S, 1=A
```

## 2. Encoding Layer

Answer: `CHILL`

Binary:

```text
01000110 01001011 01001100 01001111 01001111
```

ASCII result:

```text
FKLOO
```

Reverse Caesar shift by 3:

```text
F->C, K->H, L->I, O->L, O->L
```

## 3. Security Log

Answer: `14.04.2025`

Accepted formats:

```text
14/04/2025
14-04-2025
14.04.2025
14042025
2025-04-14
```

The fake SSH log gives:

```text
day: 14
month: 04
year: 2025
```

## 4. Logic Core

Answer: `Server C`

Statements:

```text
A: The signal is on Server B.
B: The signal is not on Server C.
C: Server A is lying.
```

If stored on A:

```text
A false, B true, C true
```

Two statements are true, so A is invalid.

If stored on B:

```text
A true, B true, C false
```

Two statements are true, so B is invalid.

If stored on C:

```text
A false, B false, C true
```

Exactly one statement is true, so C is the unique solution.

## 5. Terminal Sandbox

Winning command:

```text
decode signal.enc
```

Useful commands:

```text
help
ls
cat README.txt
cat notes.txt
cat access.log
decode signal.enc
```

Easter eggs:

```text
sudo
sudo make_me_a_sandwich
uname -a
uptime
date
telnet stars
rm -rf /
hypnotize pipo
cat .secret
```

## 6. Neural Interface

No answer. Press `Initialize module`.

This is intentionally a joke, not a real hypnosis sequence.

## 7. The Beach

Answer: `chill`

This preserves the real answer after Lisa's declaration on the beach on 14 April 2025.

## Final Reveal

The system reveals:

```text
SOURCE: LISA
```

Then it shows the final message.
