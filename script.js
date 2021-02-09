"use strict";

const genBtn = document.querySelector(".btn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let hue, number, scale, shapeNum;

// Set the canvas sizing
const setCanvasSize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const drawFlower = () => {
  let angle = number * shapeNum;
  let radius = scale * Math.sqrt(number);
  let positionX = radius * Math.sin(angle) + canvas.width / 2;
  let positionY = radius * Math.cos(angle) + canvas.height / 2;

  // draw shape
  ctx.fillStyle = `hsl(${hue},100%,50%)`; // fill color
  ctx.strokeStyle = "black"; // stroke color
  ctx.lineWidth = 4; // width of stroke

  ctx.beginPath(); // draw
  ctx.arc(positionX, positionY, 20, 0, Math.PI * 2); // set circle attributes
  ctx.closePath(); // end draw

  ctx.fill(); // fill shape
  ctx.stroke(); // add a border

  number++; // radius shift
  hue++; // colour shift
};

const drawLoop = () => {
  drawFlower();

  // halt at a set size
  if (number > 800) return;

  requestAnimationFrame(drawLoop);
};

// Generate Button
genBtn.addEventListener("click", () => {
  // Clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // set init variables
  hue = Math.random() * 360;
  number = 0; // number of petals
  scale = 10; // grow the flower
  shapeNum = Math.round(Math.random() * 20) + 1;

  drawLoop();
});

// refresh size on screen size change
window.onresize = function () {
  setCanvasSize();
};

// initial screen setup
setCanvasSize();
