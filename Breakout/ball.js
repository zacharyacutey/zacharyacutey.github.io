
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}
