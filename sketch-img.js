const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

let text = "A";
let fontSize = 1200;
let fontFamily = "serif";

let manager;
let img;

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;
  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = "black";
    typeContext.fillRect(0, 0, cols, rows);

    typeContext.save();
    typeContext.drawImage(img, 0, 0, cols, rows); // draw image
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    context.textBaseline = "middle";
    context.textAlign = "center";

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;
      // const x = col * cell + random.range(-cell, cell) * 0.5;
      // const y = row * cell + random.range(-cell, cell) * 0.5;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph((r + g + b) / 3);

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;

      // context.fillStyle = "white";
      context.fillStyle = `rgb(${r * 2},${g * 2},${b * 2})`;

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      // context.fillRect(0, 0, cell, cell);

      context.fillText(glyph, 0, 0);

      context.restore();
    }
    context.drawImage(typeCanvas, 0, 0);
  };
};

const getGlyph = (v) => {
  // if (v < 50) return "";
  // if (v < 100) return ".";
  // if (v < 150) return "-";
  // if (v < 200) return "+";

  const glyphs = "_=/".split("");

  return random.pick(glyphs);
  // return text;
};

const loadImg = async () => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = "./nidal_peng1.jpeg";
  });
};

loadImg().then((res) => {
  img = res;
  init();
});

const onKeyUp = (e) => {
  text = e.key;
  manager.render();
};

document.addEventListener("keyup", onKeyUp);

const init = async () => {
  manager = await canvasSketch(sketch, settings);
};

// init();
