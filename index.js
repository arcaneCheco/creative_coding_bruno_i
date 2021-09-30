const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
context.fillStyle = "blue";
context.lineWidth = 4;
// context.beginPath();
// context.rect(100, 100, 400, 400);
// context.stroke();
// context.fillRect(100, 100, 400, 400);
// context.beginPath();
// context.arc(300, 300, 100, 0, 2 * Math.PI);
// context.stroke();

const length = 5;
const gap = 20;
const width = 60;
const height = 60;
const offset = 8;
for (let i = 0; i < length; i++) {
  for (let j = 0; j < length; j++) {
    const x = 100 + i * (gap + width);
    const y = 100 + j * (gap + height);
    context.beginPath();
    context.rect(x, y, width, height);
    context.stroke();
    // inner
    context.beginPath();
    context.rect(
      x + offset,
      y + offset,
      width - 2 * offset,
      height - 2 * offset
    );
    context.stroke();
  }
}
