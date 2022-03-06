
const colors = ["#99d98c","#76c893","#52b69a","#34a0a4","#168aad","#1a759f","#1e6091","#184e77"]
let bgColor = "#99d98c"
let melodyInd = -1
let counter1Ind = -1
let counter2Ind = -1


const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const w = canvas.width
const h = canvas.height
const ctx = canvas.getContext("2d")


function setBg() {
  let newColor = colors[Math.floor(Math.random() * colors.length)]
  while (newColor == bgColor) {
    newColor = colors[Math.floor(Math.random() * colors.length)]
  }
  bgColor = newColor
}

function setBgYellow() {
  bgColor = "#d9ed92"
}

function drawBg(color) {
  ctx.globalAlpha = 1
  ctx.fillStyle = color
  ctx.fillRect(0, 0, w, h)
}

function randInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function drawLight(cX, cY, color) {
  ctx.fillStyle = color;
  let totRad = w/5

  ctx.globalAlpha = 0.3
  ctx.beginPath();
  ctx.arc(cX, cY, totRad, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cX, cY, (totRad)*(randInRange(0.85,0.95)), 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cX, cY, (totRad)*(randInRange(0.7,0.85)), 0, 2 * Math.PI);
  ctx.fill();

  ctx.globalAlpha = 0.5
  ctx.beginPath();
  ctx.arc(cX, cY, (totRad)*(randInRange(0.5,0.65)), 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cX, cY, (totRad)*(randInRange(0.25,0.45)), 0, 2 * Math.PI);
  ctx.fill();

  ctx.globalAlpha = 1
  ctx.beginPath();
  ctx.arc(cX, cY, (totRad)*(0.2), 0, 2 * Math.PI);
  ctx.fill();
}

function drawCounter1(ind) {
  if (ind < 0) return
  let cY = (h/5) + ind*(((4*h/5) - (h/5))/12)
  drawLight(w/4, cY, "#7400B8") // purple
}

function drawCounter2(ind) {
  if (ind < 0) return
  let cY = (h/5) + ind*(((4*h/5) - (h/5))/12)
  drawLight(3*w/4, cY, "#FDDB41") // yellow
}

function drawMelody(ind) {
  if (ind < 0) return
  let cY = (h/5) + ind*(((4*h/5) - (h/5))/12)
  drawLight(w/2, cY, "#F94144") // red
}
