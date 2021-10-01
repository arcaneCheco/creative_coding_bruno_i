const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;

    const w = width * 0.01;
    const h = height * 0.1;

    const r = width * 0.3;

    const count = 24;
    for (let i = 0; i < count; i++) {
      const slice = (2 * Math.PI) / count;
      const angle = i * slice;

      const x = r * Math.sin(angle);
      const y = r * Math.cos(angle);

      context.save();

      context.translate(cx, cy);
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

      context.beginPath();
      context.rect(-w * 0.5, -h * random.range(0, 0.5), w, h);
      context.fill();

      context.restore();

      context.save();

      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5, 20);

      context.beginPath();
      context.arc(
        0,
        0,
        r * random.range(0.7, 1.3),
        slice * random.range(0, -0.5),
        slice * random.range(0, 0.5)
      );
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
