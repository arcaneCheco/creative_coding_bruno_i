const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const { Pane } = require("tweakpane");

const settings = {
  dimensions: [1080, 1080],
};

const params = {
  w: 0.01,
  h: 0.1,
  r: 0.3,
  count: 24,
  scale: {
    width: {
      lower: 0.1,
      upper: 2,
    },
    height: {
      lower: 0.2,
      upper: 0.5,
    },
  },
};

let manager;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width * 0.5;
    const cy = height * 0.5;

    const w = width * params.w;
    const h = height * params.h;

    const r = width * params.r;

    const count = params.count;
    for (let i = 0; i < count; i++) {
      const slice = (2 * Math.PI) / count;
      const angle = i * slice;

      const x = r * Math.sin(angle);
      const y = r * Math.cos(angle);

      context.save();

      context.translate(cx, cy);
      context.translate(x, y);
      context.rotate(-angle);
      context.scale(
        random.range(params.scale.width.lower, params.scale.width.upper),
        random.range(params.scale.height.lower, params.scale.height.upper)
      );

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

const createPane = () => {
  const pane = new Pane();
  const folder = pane.addFolder({ title: "dimensions" });
  folder
    .addInput(params, "w", { label: "w", min: 0, max: 1, step: 0.001 })
    .on("change", () => manager.render());
  folder
    .addInput(params, "h", { label: "h", min: 0, max: 1, step: 0.001 })
    .on("change", () => manager.render());
  folder
    .addInput(params, "r", { label: "r", min: 0, max: 1, step: 0.001 })
    .on("change", () => manager.render());
  folder
    .addInput(params, "count", { label: "count", min: 0, max: 120, step: 1 })
    .on("change", () => manager.render());
  folder
    .addInput(params.scale.width, "lower", {
      label: "scale-width-lower",
      min: 0,
      max: 1,
      step: 0.001,
    })
    .on("change", () => manager.render());
  folder
    .addInput(params.scale.width, "upper", {
      label: "scale-width-upper",
      min: 1,
      max: 4,
      step: 0.001,
    })
    .on("change", () => manager.render());
  folder
    .addInput(params.scale.height, "lower", {
      label: "scale-height-lower",
      min: 0,
      max: 1,
      step: 0.001,
    })
    .on("change", () => manager.render());
  folder
    .addInput(params.scale.height, "upper", {
      label: "scale-height-upper",
      min: 1,
      max: 4,
      step: 0.001,
    })
    .on("change", () => manager.render());
};

createPane();

const init = async () => {
  manager = await canvasSketch(sketch, settings);
};

init();
