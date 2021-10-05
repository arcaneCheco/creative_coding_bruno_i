const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  duration: 4,
  fps: 36,
};

const params = {
  rad: 30,
  size: 400,
  num: 24,
};

const sketch = ({ context, width, height }) => {
  const points = [];
  const slice = (2 * Math.PI) / params.num;
  for (let i = 0; i < params.num; i++) {
    const point = new Point(0, 0);
    points.push(point);
  }
  return ({ context, width, height, playhead }) => {
    playhead *= 1.5;
    if (playhead > 1) playhead = 1;
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.save();
    context.fillStyle = "black";
    context.translate(width / 2, height / 2);
    context.lineWidth = 4;

    points.forEach((point, index) => {
      let p = playhead * params.num;
      const x = params.size * Math.cos(index * slice);
      const y = params.size * Math.sin(index * slice);
      const p1 = Math.min(Math.max(p - index, 0), 1);
      point.update(context, x * p1, y * p1, p1);
      for (let j = index; j < params.num; j++) {
        context.beginPath();
        context.moveTo(point.x, point.y);
        context.lineTo(points[j].x, points[j].y);
        context.stroke();
      }
    });

    context.restore();
  };
};

canvasSketch(sketch, settings);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  update(context, newx, newy, alpha) {
    this.x = newx;
    this.y = newy;
    this.draw(context, alpha);
  }
  draw(context, alpha) {
    context.save();
    context.beginPath();
    context.lineWidth = 22;
    context.fillStyle = "black";
    context.globalAlpha = alpha;
    context.translate(this.x, this.y);
    context.arc(0, 0, params.rad, 0, 2 * Math.PI);
    // context.fill();
    context.stroke();
    context.restore();
  }
}
