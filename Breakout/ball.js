
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.strokeStyle = "#000000";
    ctx.lineTo(x+dx*10,y+dx*10);
    ctx.stroke();
    ctx.closePath();
}
