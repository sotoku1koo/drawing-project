const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// 设置 canvas 尺寸为窗口大小
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 绘图状态
let isDrawing = false;
let isErasing = false;
let lastX = 0;
let lastY = 0;

// 清空画布
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 开始绘图
function startDrawing(e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

// 绘制
function draw(e) {
  if (!isDrawing) return;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000'; // 黑色画笔
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

// 停止绘图
function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

// 工具切换
document.getElementById('brushTool').addEventListener('click', () => {
  isErasing = false; // 取消橡皮擦状态
});

document.getElementById('eraserTool').addEventListener('click', () => {
  clearCanvas(); // 点击 "Erase" 清空画布
});

// 添加事件监听器
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// 窗口调整大小时调整 canvas 尺寸
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  clearCanvas(); // 窗口调整大小后清空画布
});
