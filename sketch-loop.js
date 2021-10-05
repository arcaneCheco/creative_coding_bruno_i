const canvasSketch = require("canvas-sketch");
const {
  fract,
  lerp,
  clamp,
  mapRange,
  clamp01,
  sign,
} = require("canvas-sketch-util/math");

const settings = {
  dimensions: [1080, 1920],
  duration: 3,
  animate: true,
  fps: 36,
};

const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const num = 30;
let rad;

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

const sketch = ({ width, height }) => {
  const grid = [];
  const cols = 20;
  const rows = 40;
  const sqr3 = Math.sqrt(3);
  const w = width / cols;
  const h = height / rows;
  rad = w / 2;
  const numMoons = cols * rows;

  for (let i = 0; i < numMoons; i++) {
    // const x = (width * (i % cols)) / cols;
    const x =
      (i % cols) * w +
      rad / 2 +
      ((Math.floor(i / cols) % 2) * w) / 2 -
      width / 2;
    const y = (Math.floor(i / cols) * w * sqr3) / 2 - height / 2;

    let dist = distance(x, y, 0, 0) / distance(0, 0, width / 2, height / 2);
    const angle = Math.atan2(y, x) / Math.PI;
    // const offset = (i % cols) / cols;
    const offset = (4 + dist * 2 + angle) % 1;

    grid.push({ x, y, offset });
  }

  // for (let i = 0; i < cols; i++) {
  //   for (let j = 0; j < rows; j++) {
  //     const x = (width * i) / cols;
  //     const y = (height * j) / rows;
  //     grid.push({ x, y });
  //   }
  // }
  const render = ({ context, width, height, playhead }) => {
    context.lineWidth = 10;

    context.fillStyle = "#ccc";
    context.fillRect(0, 0, width, height);

    context.save();
    context.translate(width / 2, height / 2);

    grid.forEach((g) => drawMoon(g.x, g.y, context, playhead, g.offset));
    context.restore();
  };
  return render;
};

canvasSketch(sketch, settings);

const drawMoon = (x, y, context, progress, offset) => {
  context.save();
  context.translate(x, y);

  progress = (progress + offset) % 1;

  let p = progress * 2;

  let color1, color2;

  if (p < 1) {
    color1 = "#fff";
    color2 = "#000";
  } else {
    color1 = "#000";
    color2 = "#fff";
    p -= 1;
  }

  context.fillStyle = color1;
  context.beginPath();
  for (let i = 0; i < num; i++) {
    const theta = (i / num) * 2 * Math.PI;
    const xx = rad * Math.cos(theta);
    const yy = rad * Math.sin(theta);
    context.lineTo(xx, yy);
  }
  context.closePath();
  context.fill();

  context.fillStyle = color2;
  context.beginPath();
  p = ease(p) * 2 - 1;
  for (let i = 0; i < num; i++) {
    const theta = (i / num) * 2 * Math.PI;
    let xx = rad * Math.sin(theta);
    const yy = rad * Math.cos(theta);
    if (theta > Math.PI) xx *= p;
    context.lineTo(xx, yy);
  }
  context.closePath();
  context.fill();

  context.restore();
};
