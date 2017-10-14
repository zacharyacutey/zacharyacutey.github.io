function collision(obj) {
    var top = y + dy - ballRadius;
    var bottom = y + dy + ballRadius;
    var left = x + dx - ballRadius;
    var right = x + dx + ballRadius;
    var bl = obj.x;
    var bx = obj.x + brickWidth/2;
    var br = obj.x + brickWidth;
    var bt = obj.y;
    var by = obj.y + brickHeight/2;
    var bb = obj.y + brickHeight;
    if(obj.status) {
        if(bt < y + dy && y + dy < bb) {
            if(bl < right && right < br || bl < left && left < br) {
                dx = -dx;
                color = obj.color;
                obj.status = 0;
            }
        } else if(bl < x + dx && x + dx < br) {
            if(bt < top && top < bb || bt < bottom && bottom < bb) {
                dy = -dy;
                color = obj.color;
                obj.status = 0;
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height - paddleHeight - ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            document.location.reload();
        }
    }
    for(var m = 0; m < bricks.length; m++) {
        for(var n = 0; n < bricks[m].length; n++) {
            collision(bricks[m][n]);
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 10);
