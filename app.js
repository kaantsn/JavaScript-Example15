// Variables for the game canvas
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Ball starting position and speed
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 4;
var dy = -4;
var ballRadius = 10;

// Paddle properties
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

// Score variable
var score = 0;

// Game over variable and message
var gameOver = false;
var gameOverMessage = document.getElementById("gameOverMessage");

// Respond to key presses on the game canvas
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = getRandomColor();
    ctx.fill();
    ctx.closePath();
}

// Draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Update and draw the game canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();

    // Move the ball
    x += dx;
    y += dy;

    // Ball collision detection with the boundaries
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        // Ball collision detection with the paddle
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            score++;
        } else {
            // Game over if the ball is not caught
            gameOver = true;
            showGameOverMessage();
        }
    }

    // Move the paddle based on key presses
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    if (!gameOver) {
        requestAnimationFrame(draw);
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function showGameOverMessage() {
    gameOverMessage.style.display = "block";
}

draw();
