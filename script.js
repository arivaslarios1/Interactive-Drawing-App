const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const clearBtn = document.getElementById("clearBtn");
const saveBtn = document.getElementById("saveBtn");
const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");
const brushValue = document.getElementById("brushValue");

canvas.width = 600;
canvas.height = 400;

let isDrawing = false;

ctx.lineWidth = brushSize.value;
ctx.lineCap = "round";
ctx.strokeStyle = colorPicker.value;

function getMousePosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  };
}

canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  const pos = getMousePosition(event);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);
});

canvas.addEventListener("mousemove", (event) => {
  if (!isDrawing) return;

  const pos = getMousePosition(event);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("mouseleave", () => {
  isDrawing = false;
});

clearBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

colorPicker.addEventListener("input", () => {
  ctx.strokeStyle = colorPicker.value;
});

brushSize.addEventListener("input", () => {
  ctx.lineWidth = brushSize.value;
  brushValue.textContent = brushSize.value;
});

saveBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "my-drawing.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});

/*===Full Size Screen===*/
const fullscreenBtn = document.getElementById("fullscreenBtn");

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

/*===Resize===*/
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  } else {
    canvas.width = 600;
    canvas.height = 400;
  }
});

/*==Brush Types===*/
const brushType = document.getElementById("brushType");
brushType.addEventListener("change", () => {
  if (brushType.value === "round") {
    ctx.lineCap = "round";
  } else {
    ctx.lineCap = "butt";
  }
});

ctx.globalAlpha = 0.7;