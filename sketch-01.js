const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [600, 600],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const length = 5;
    const gap = 20;
    const w = 60;
    const h = 60;
    const offset = 8;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        const x = 100 + i * (gap + w);
        const y = 100 + j * (gap + h);
        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();
        // inner
        context.beginPath();
        context.rect(x + offset, y + offset, w - 2 * offset, h - 2 * offset);
        context.stroke();
      }
    }
  };
};

canvasSketch(sketch, settings);
