const canvasSketch = require("canvas-sketch");
const { Pane } = require("tweakpane");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.2,
  speed: 10,
  frame: 0,
  animate: true,
  linecap: "butt",
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;
    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const f = params.animate ? frame : params.frame;
      // const n = random.noise2D(x + frame * 10, y, params.freq);
      const n = random.noise3D(x, y, f * params.speed, params.freq);

      const angle = n * Math.PI * params.amp;

      // const scale = n * 0.5 + 0.5; // map to 0->1
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.translate(margx, margy);
      context.translate(x, y); // go to top-left corner of cell
      context.translate(0.5 * w, 0.5 * h); // go to cell center
      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.linecap;

      context.beginPath();
      context.moveTo(-w * 0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();
      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new Pane();
  const gridFolder = pane.addFolder({ title: "Grid" });
  gridFolder.addInput(params, "linecap", {
    options: { butt: "butt", round: "round", square: "square" },
  });
  gridFolder.addInput(params, "cols", {
    label: "cols",
    min: 0,
    max: 100,
    step: 1,
  });
  gridFolder.addInput(params, "rows", {
    label: "rows",
    min: 0,
    max: 100,
    step: 1,
  });
  gridFolder.addInput(params, "scaleMin", {
    label: "scaleMin",
    min: 0,
    max: 100,
  });
  gridFolder.addInput(params, "scaleMax", {
    label: "scaleMax",
    min: 0,
    max: 100,
  });
  const noiseFolder = pane.addFolder({ title: "Noise" });
  noiseFolder.addInput(params, "freq", {
    label: "freq",
    min: 0,
    max: 0.1,
    step: 0.00001,
  });
  noiseFolder.addInput(params, "amp", {
    label: "amp",
    min: 0,
    max: 1,
    step: 0.0001,
  });
  noiseFolder.addInput(params, "speed", {
    label: "speed",
    min: 0,
    max: 100,
    step: 0.01,
  });
  const animationFolder = pane.addFolder({ title: "Animation" });
  animationFolder.addInput(params, "animate", { label: "animate" });
  animationFolder.addInput(params, "frame", {
    label: "frame",
    min: 0,
    max: 999,
    step: 1,
  });
};
createPane();
canvasSketch(sketch, settings);
