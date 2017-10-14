function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = color;
    ctx.strokeStyle = "#FF0000";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}
