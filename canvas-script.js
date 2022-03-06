

// const colors = ["#f94144","#f3722c","#f8961e","#f9844a","#f9c74f","#90be6d","#43aa8b","#4d908e","#577590","#277da1"] // campfirey colors
// "#b5e48c"
const colors = ["#99d98c","#76c893","#52b69a","#34a0a4","#168aad","#1a759f","#1e6091","#184e77"]
let prevBg = ""


const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const w = canvas.width
const h = canvas.height
const ctx = canvas.getContext("2d")

function changeBg() {
  ctx.globalAlpha = 1
  let newColor = colors[Math.floor(Math.random() * colors.length)]
  while (newColor == prevBg) {
    newColor = colors[Math.floor(Math.random() * colors.length)]
  }
  prevBg = newColor
  ctx.fillStyle = newColor
  ctx.fillRect(0, 0, w, h)
}

function changeBgYellow() {
  ctx.globalAlpha = 1
  ctx.fillStyle = "#d9ed92"
  ctx.fillRect(0, 0, w, h)
}

function randInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function drawLight(cX, cY, color) {
  ctx.fillStyle = color;

  ctx.globalAlpha = 0.3
  ctx.beginPath();
  ctx.arc(cX, cY, w/5, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cX, cY, (w/5)*(randInRange(0.85,0.95)), 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cX, cY, (w/5)*(randInRange(0.7,0.85)), 0, 2 * Math.PI);
  ctx.fill();

  ctx.globalAlpha = 0.5
  ctx.beginPath();
  ctx.arc(cX, cY, (w/5)*(randInRange(0.5,0.65)), 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(cX, cY, (w/5)*(randInRange(0.25,0.45)), 0, 2 * Math.PI);
  ctx.fill();

  ctx.globalAlpha = 1
  ctx.beginPath();
  ctx.arc(cX, cY, (w/5)*(0.2), 0, 2 * Math.PI);
  ctx.fill();
}
