# Printing Guide

## Access Card

Model:

```text
3d/pipo_access_card.scad
```

Size:

```text
85 mm × 54 mm × 3 mm
```

The model is designed as a small desk or wallet card.

## Recommended Print Settings

- Material: PLA or PETG
- Nozzle: 0.4 mm
- Layer height: 0.16 mm or 0.2 mm
- Infill: 15-25%
- Supports: no
- Top/bottom layers: 4 or more
- Perimeters: 3

For readable text, use a contrasting filament swap for the raised lettering if your slicer supports pause-at-height.

## QR Code

The OpenSCAD model includes a placeholder QR area and decorative blocks, not a real QR code.

Most reliable method:

1. Publish the game.
2. Generate a real QR for the public URL.
3. Print it on white sticker paper.
4. Stick it onto the back of the card.
5. Test it with a phone.

Keep the QR code high contrast and avoid glossy glare.

## Export STL

Open `3d/pipo_access_card.scad` in OpenSCAD.

1. Press `F5` for Preview.
2. Press `F6` for Render.
3. Choose `File > Export > Export as STL`.

You can also render only the QR plate with `3d/qr_plate.scad`.

## Paper Packaging

Use a normal printer and fold a small envelope insert.

Front:

```text
CLASSIFIED
FOR: PIPO
DO NOT OPEN UNLESS YOU ARE READY TO DEBUG THE UNIVERSE.
```

Inside:

```text
MISSION BRIEFING
TARGET: PIPO
CLEARANCE: CLASSIFIED
DATE: 14.04
SCAN TO BEGIN.
```
