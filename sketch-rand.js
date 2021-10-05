const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  // duration: 3,
  animate: true,
};

const distance = (x1, y1, x2, y2) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

const sketch = ({ width, height }) => {
  const radX = 30;
  const radY = 30;
  const grid = [];
  const cols = 19;
  const rows = 19;
  const numCells = cols * rows;
  const w = width / cols;
  const h = height / rows;
  for (let i = 0; i < numCells; i++) {
    const x = (i % cols) * w - width / 2;
    const y = Math.floor(i / cols) * h - height / 2;
    let off = (i % cols) / cols + Math.floor(i / cols) / rows;
    grid.push({ x, y, off });
  }
  const render = ({ context, width, height, playhead, frame }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);
    context.fillStyle = "black";

    grid.forEach((cell) => {
      context.save();
      context.translate(radX, radY);
      context.translate(cell.x, cell.y);
      const dist =
        distance(cell.x, cell.y, 0, 0) / distance(0, 0, width / 2, height / 2);
      const angle = Math.atan2(cell.y, cell.x) / Math.PI + frame / 60;
      let offset = ((angle * (2 + ((frame / 100) % 1)) + dist) % 1) + 0.4;
      // offset = cell.x / width;
      // offset = cell.off;
      context.fillStyle = `rgb(
        ${cell.x},
        ${cell.y},
        ${dist * 255})`;
      context.beginPath();
      for (let i = 0; i < 4; i++) {
        const theta = (i / 4) * 2 * Math.PI;
        const xx =
          ((radX * Math.cos(theta) * (Math.sin(frame * 0.02) + 4)) / 2) *
          offset;
        const yy =
          ((radY * Math.sin(theta) * (Math.cos(frame * 0.02) + 4)) / 2) *
          offset;
        context.lineTo(xx, yy);
        context.rotate(frame / 40);
      }
      context.closePath();
      context.fill();

      context.restore();
    });

    context.restore();
  };
  return render;
};

canvasSketch(sketch, settings);
