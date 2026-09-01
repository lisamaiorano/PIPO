// PIPO // DEEP SPACE SIGNAL
// Parametric access card for OpenSCAD.
// Units: millimeters.

$fn = 32;

card_w = 85;
card_h = 54;
card_t = 3;
corner_r = 3;

text_raise = 0.65;
line_raise = 0.35;
qr_size = 30;
qr_x = 27.5;
qr_y = 12;

module rounded_rect_2d(w, h, r) {
  hull() {
    translate([r, r]) circle(r);
    translate([w - r, r]) circle(r);
    translate([r, h - r]) circle(r);
    translate([w - r, h - r]) circle(r);
  }
}

module card_base() {
  linear_extrude(card_t) rounded_rect_2d(card_w, card_h, corner_r);
}

module raised_text(label, size, x, y, z, halign = "left") {
  translate([x, y, z])
    linear_extrude(text_raise)
      text(label, size = size, font = "Liberation Sans:style=Bold", halign = halign, valign = "baseline");
}

module raised_line(x, y, w, h = 0.45) {
  translate([x, y, card_t])
    linear_extrude(line_raise)
      square([w, h]);
}

module qr_placeholder(x, y, size) {
  cell = size / 9;
  pattern = [
    [1,1,1,0,1,0,1,1,1],
    [1,0,1,0,0,1,1,0,1],
    [1,1,1,1,0,0,1,1,1],
    [0,0,1,0,1,1,0,0,1],
    [1,0,0,1,1,0,1,0,0],
    [0,1,1,0,0,1,0,1,1],
    [1,1,1,0,1,0,1,1,1],
    [1,0,1,1,0,1,1,0,1],
    [1,1,1,0,1,1,1,1,1]
  ];

  translate([x, y, card_t])
    linear_extrude(line_raise)
      difference() {
        square([size, size]);
        translate([1.2, 1.2]) square([size - 2.4, size - 2.4]);
      }

  for (row = [0:8]) {
    for (col = [0:8]) {
      if (pattern[row][col] == 1) {
        translate([x + col * cell + 0.18, y + (8 - row) * cell + 0.18, card_t])
          linear_extrude(text_raise)
            square([cell - 0.36, cell - 0.36]);
      }
    }
  }
}

module front_face() {
  card_base();
  raised_text("PIPO", 9.5, 6, 39, card_t);
  raised_text("DEEP SPACE SIGNAL", 4.5, 6, 32, card_t);
  raised_line(6, 28, 48);
  raised_text("ID: 14.04.2025", 4, 6, 21, card_t);
  raised_text("STATUS: ACTIVE", 4, 6, 15, card_t);
  raised_text("CLEARANCE: CLASSIFIED", 3.2, 6, 9, card_t);

  translate([66, 35, card_t])
    linear_extrude(line_raise)
      circle(5);
  translate([66, 35, card_t + line_raise])
    linear_extrude(line_raise)
      circle(1.5);
}

module back_face() {
  card_base();
  qr_placeholder(qr_x, qr_y, qr_size);
  raised_text("SCAN TO BEGIN", 4.2, card_w / 2, 45, card_t, "center");
  raised_text("GAME_URL_PLACEHOLDER", 2.3, card_w / 2, 7, card_t, "center");
}

// Export one side at a time if you want separate two-color prints.
// Default: front card.
front_face();

// Uncomment to preview the back instead.
// back_face();
