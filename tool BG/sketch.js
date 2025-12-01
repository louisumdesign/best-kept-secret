let pgHello, pgWorld;
let imgHello, imgWorld;

function setup() {
  createCanvas(1920, 1080);
  textSize(100);
  textAlign(CENTER, CENTER);
  noStroke();

  // Offscreen buffers
  pgHello = createGraphics(width, height);
  pgWorld = createGraphics(width, height);
  pgHello.textSize(100);
  pgHello.textAlign(CENTER, CENTER);
  pgWorld.textSize(100);
  pgWorld.textAlign(CENTER, CENTER);
}

function draw() {
  background(200, 180, 255); // background color

  // --- Draw HELLO ---
  pgHello.clear();
  pgHello.fill(255);
  pgHello.text("f", width / 2, height / 2);
  imgHello = pgHello.get();
  imgHello.loadPixels();

  // --- Draw WORLD ---
  pgWorld.clear();
  pgWorld.fill(255);
  pgWorld.text("a", mouseX, mouseY);
  imgWorld = pgWorld.get();
  imgWorld.loadPixels();

  // --- Create final image by combining pixels ---
  let finalImg = createImage(width, height);
  finalImg.loadPixels();

  for (let i = 0; i < finalImg.pixels.length; i += 4) {
    let helloVisible = imgHello.pixels[i] > 0; // R channel
    let worldVisible = imgWorld.pixels[i] > 0; // R channel

    if (helloVisible && worldVisible) {
      // Overlap -> black
      finalImg.pixels[i] = 0;
      finalImg.pixels[i + 1] = 0;
      finalImg.pixels[i + 2] = 0;
      finalImg.pixels[i + 3] = 255;
    } else if (helloVisible) {
      // HELLO -> white
      finalImg.pixels[i] = 255;
      finalImg.pixels[i + 1] = 255;
      finalImg.pixels[i + 2] = 255;
      finalImg.pixels[i + 3] = 255;
    } else if (worldVisible) {
      // WORLD -> white
      finalImg.pixels[i] = 255;
      finalImg.pixels[i + 1] = 255;
      finalImg.pixels[i + 2] = 255;
      finalImg.pixels[i + 3] = 255;
    } else {
      // background transparent (will show canvas background)
      finalImg.pixels[i + 3] = 0;
    }
  }

  finalImg.updatePixels();
  image(finalImg, 0, 0);
}
