cnvs = document.getElementById("cnvs")
ctx = cnvs.getContext("2d")
colors = ['800000', '8B0000', 'B22222', 'FF0000', 'FA8072', 'FF6347', 'FF7F50', 'FF4500', 'D2691E', 'F4A460', 'FF8C00', 'FFA500', 'B8860B', 'DAA520', 'FFD700', '808000', 'FFFF00', '9ACD32', 'ADFF2F', '7FFF00', '7CFC00', '008000', '00FF00', '32CD32', '00FF7F', '00FA9A', '40E0D0', '20B2AA', '8D1CC"', '008080', '008B8B', '00FFFF', '00FFFF', '00CED1', '00BFFF', '1E90FF', '4169E1', '000080', '00008B', '0000CD', '0000FF', '8A2BE2', '9932CC', '9400D3', '800080', '8B008B', 'FF00FF', 'FF00FF', 'C71585', 'FF1493', 'F69B4"', 'DC143C', 'A52A2A', 'CD5C5C', 'BC8F8F', 'F08080', 'FFFAFA', 'FFE4E1', 'E9967A', 'FFA07A', 'A0522D', 'FFF5EE', '8B4513', 'FFDAB9', 'CD853F', 'FAF0E6', 'FFE4C4', 'DEB887', 'D2B48C', 'FAEBD7', 'FFDEAD', 'FFEBCD', 'FFEFD5', 'FFE4B5', 'F5DEB3', 'FDF5E6', 'FFFAF0', 'FFF8DC', 'F0E68C', 'FFFACD', 'EEE8AA', 'BDB76B', 'F5F5DC', 'FAFAD2', 'FFFFE0', 'FFFFF0', '6B8E23', '556B2F', '8FBC8F', '006400', '228B22', '90EE90', '98FB98', 'F0FFF0', '2E8B57', '3CB371', 'F5FFFA', '66CDAA', '7FFFD4', '2F4F4F', 'AFEEEE', 'E0FFFF', 'F0FFFF', '5F9EA0', 'B0E0E6', 'ADD8E6', '87CEEB', '87CEFA', '4682B4', 'F0F8FF', '708090', '778899', 'B0C4DE', '6495ED', 'E6E6FA', 'F8F8FF', '191970', '6A5ACD', '483D8B', '7B68EE', '9370DB', '4B0082', 'BA55D3', 'DDA0DD', 'EE82EE', 'D8BFD8', 'DA70D6', 'FFF0F5', 'DB7093', 'FFC0CB', 'FFB6C1', '000000', '696969', '808080', 'A9A9A9', 'C0C0C0', 'D3D3D3', 'DCDCDC', 'F5F5F5', 'FFFFFF']

var width, height

function resize() { cnvs.width = width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); cnvs.height = height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); }

resize();
window.addEventListener("resize", resize);

//initialising array
var balls = []

//url:  gravity, no balls, min radius, max radius, velocity
urlVariables = location.href.split("?")[1].split(",")

//variables
var noBalls = +urlVariables[1]
var radius = {min: +urlVariables[2], max: +urlVariables[3]} 			//min, max
var velocity = {min: -urlVariables[4], max: +urlVariables[4]}
var gravity = +urlVariables[0]				//global gravity
var spawn = {x: 50, y: 50,  w: width - 50, h: height - 50}	//limits for ball to spawn inside

function randNum(min, max){					//returns random integer including min, excluding max
	return Math.random() * (max - min) + min
}

function overlap(x1, y1, x2, y2, r1, r2){
	distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
	if (distance < r1 + r2){
		return true
	}
	return false
}

function momentum(u1, u2, m1, m2){
	v1 = (u1 * (m1 - m2) + (2 * m2 * u2))/(m1 + m2)
	v2 = (u2 * (m2 - m1) + (2 * m1 * u1))/(m1 + m2)
	return [v1, v2]
}

function drawCircle(x, y, radius, color){
	ctx.beginPath(x, y)
	ctx.arc(x, y, radius, 0, Math.PI * 2)
	ctx.strokeStyle = "black"
	ctx.stroke()
	ctx.fillStyle = "#" + color
	ctx.fill()
}

function clearScreen(){
	ctx.clearRect(0, 0, width, height)
}

function populateBalls(){
	for (b = 0 ; b < noBalls ; b ++){
		balls.push({x: randNum(spawn.x, spawn.w), y: randNum(spawn.y, spawn.h), vx: randNum(velocity.min, velocity.max), vy: randNum(velocity.min, velocity.max), r: randNum(radius.min, radius.max)})
	}
}

function drawBalls(){
	for (b = 0 ; b < noBalls ; b ++){
		ball = balls[b]
		drawCircle(ball.x, ball.y, ball.r, colors[b % colors.length])
	}
}

function updateBallPositions(){
	for (b = 0 ; b < noBalls ; b ++){
		ball = balls[b]
		ball.x += ball.vx
		ball.y += ball.vy
	}
}


function wallCollisions(){
	for (b = 0 ; b < noBalls ; b ++){
		ball = balls[b]
		if ((ball.x + ball.vx) - ball.r < 0 || (ball.x + ball.vx) + ball.r > width){
			ball.vx *= -1
			ball.x = Math.min(ball.x + ball.r, width) - ball.r;
		}
		if (ball.y + ball.vy - ball.r < 0 || ball.y + ball.vy + ball.r > height){
			ball.vy *= -1
			ball.y = Math.min(ball.y + ball.r, height) - ball.r;
		}
	}
}

function ballCollisions(){
	for (b1 = 0 ; b1 < noBalls ; b1 ++ ){
		for (b2 = b1 + 1 ; b2 < noBalls ; b2 ++){
			if (overlap(balls[b1].x + balls[b1].vx, balls[b1].y + balls[b1].vy, balls[b2].x + balls[b2].vx, balls[b2].y + balls[b2].vy, balls[b1].r, balls[b2].r)){
				collision(b1, b2)
			}
		}
	}
}

function normalVel(b){
	 a = (-1 / (deltaY * deltaY + deltaX * deltaX)) * ((-1 * deltaX * balls[b].vx) - (deltaY * balls[b].vy))
	 nX = a * deltaX
	 nY = a * deltaY
	 return {x: nX, y: nY}
}

function tangentVel(b){
	 b = (-1 / (deltaY * deltaY + deltaX * deltaX)) * ((deltaY * balls[b].vx) - (deltaX * balls[b].vy))
	 tX = b * -1 * deltaY
	 tY = b * deltaX
	 return {x: tX, y: tY}
}


function collision(b1, b2){

	//asignning deltaX and deltaY for the positions of the balls
	deltaX = balls[b2].x - balls[b1].x
	deltaY = balls[b2].y - balls[b1].y

	//initialising the  current normal and tangental velocities to the collision for each ball
	normVel1 = normalVel(b1)
	normVel2 = normalVel(b2)
	tangVel1 = tangentVel(b1)
	tangVel2 = tangentVel(b2)


	//applying the "momentum" function to these velocities to work out the post colliison velocities
	xNormVels = momentum(normVel1.x, normVel2.x, balls[b1].r, balls[b2].r)
	yNormVels = momentum(normVel1.y, normVel2.y, balls[b1].r, balls[b2].r)

	//reassigning the post collision velocities	
	normVel1.x = xNormVels[0]
	normVel2.x = xNormVels[1]
	normVel1.y = yNormVels[0]
	normVel2.y = yNormVels[1] 

	//setting the actual velocities of the balls to the sum of the normal and tangental velocities	
	balls[b1].vx = normVel1.x + tangVel1.x
	balls[b1].vy = normVel1.y + tangVel1.y

	balls[b2].vx = normVel2.x + tangVel2.x
	balls[b2].vy = normVel2.y + tangVel2.y


	/*
	xVels = momentum(balls[b1].vx, balls[b2].vx, balls[b1].r, balls[b2].r)
	yVels = momentum(balls[b1].vy, balls[b2].vy, balls[b1].r, balls[b2].r)
	balls[b1].vx = xVels[0]
	balls[b2].vx = xVels[1]
	balls[b1].vy = yVels[0]
	balls[b2].vy = yVels[1]
	*/
}

function applyGravity(){
	for (b = 0 ; b < noBalls ; b ++ ){
		if (balls[b].y + balls[b].r + gravity < height){
			balls[b].vy += gravity
		}
		//else balls[b].y = height - balls[b].r
		//else console.log(b, "on ground")
	}
}

function update(){

	wallCollisions()
	ballCollisions()
	applyGravity()
	updateBallPositions()
	clearScreen()
	drawBalls()
}

populateBalls();
//balls = [{x: 50, y:150, vx: 3, vy: 0, r: 30}, {x: 200, y:100, vx: 0, vy: 0, r: 30}]

setInterval(update, 15)
