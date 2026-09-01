// Standalone QR placeholder plate.
// Replace with a real QR sticker or imported real QR geometry after publishing.

$fn = 24;

plate_size = 34;
plate_t = 1.4;
qr_size = 30;

module qr_plate() {
  difference() {
    linear_extrude(plate_t)
      square([plate_size, plate_size], center = true);
    translate([0, 0, plate_t - 0.35])
      linear_extrude(0.5)
        square([qr_size, qr_size], center = true);
  }
}

module placeholder_blocks() {
  cell = qr_size / 9;
  for (row = [0:8]) {
    for (col = [0:8]) {
      if ((row * 3 + col * 5 + row * col) % 4 != 0) {
        translate([
          -qr_size / 2 + col * cell + cell / 2,
          -qr_size / 2 + row * cell + cell / 2,
          plate_t
        ])
          linear_extrude(0.45)
            square([cell * 0.7, cell * 0.7], center = true);
      }
    }
  }
}

qr_plate();
placeholder_blocks();
