cnvs = document.getElementById("cnvs")
ctx = cnvs.getContext("2d")
colors = [['#800000', '#8B0000', '#B22222', '#FF0000', '#FA8072', '#FF6347', '#FF7F50', '#FF4500', '#D2691E', '#F4A460', '#FF8C00', '#FFA500', '#B8860B', '#DAA520', '#FFD700', '#808000', '#FFFF00', '#9ACD32', '#ADFF2F', '#7FFF00', '#7CFC00', '#008000', '#00FF00', '#32CD32', '#00FF7F', '#00FA9A', '#40E0D0', '#20B2AA', '#8D1CC"', '#008080', '#008B8B', '#00FFFF', '#00FFFF', '#00CED1', '#00BFFF', '#1E90FF', '#4169E1', '#000080', '#00008B', '#0000CD', '#0000FF', '#8A2BE2', '#9932CC', '#9400D3', '#800080', '#8B008B', '#FF00FF', '#FF00FF', '#C71585', '#FF1493', '#F69B4"', '#DC143C', '#A52A2A', '#CD5C5C', '#BC8F8F', '#F08080', '#FFFAFA', '#FFE4E1', '#E9967A', '#FFA07A', '#A0522D', '#FFF5EE', '#8B4513', '#FFDAB9', '#CD853F', '#FAF0E6', '#FFE4C4', '#DEB887', '#D2B48C', '#FAEBD7', '#FFDEAD', '#FFEBCD', '#FFEFD5', '#FFE4B5', '#F5DEB3', '#FDF5E6', '#FFFAF0', '#FFF8DC', '#F0E68C', '#FFFACD', '#EEE8AA', '#BDB76B', '#F5F5DC', '#FAFAD2', '#FFFFE0', '#FFFFF0', '#6B8E23', '#556B2F', '#8FBC8F', '#006400', '#228B22', '#90EE90', '#98FB98', '#F0FFF0', '#2E8B57', '#3CB371', '#F5FFFA', '#66CDAA', '#7FFFD4', '#2F4F4F', '#AFEEEE', '#E0FFFF', '#F0FFFF', '#5F9EA0', '#B0E0E6', '#ADD8E6', '#87CEEB', '#87CEFA', '#4682B4', '#F0F8FF', '#708090', '#778899', '#B0C4DE', '#6495ED', '#E6E6FA', '#F8F8FF', '#191970', '#6A5ACD', '#483D8B', '#7B68EE', '#9370DB', '#4B0082', '#BA55D3', '#DDA0DD', '#EE82EE', '#D8BFD8', '#DA70D6', '#FFF0F5', '#DB7093', '#FFC0CB', '#FFB6C1', '#000000', '#696969', '#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC', '#F5F5F5', '#FFFFFF'], ['#838B8B', '#7A8B8B', '#C1CDCD', '#668B8B', '#B4CDCD', '#2F4F4F', '#2F4F4F', '#5F9F9F', '#C0D9D9', '#528B8B', '#E0EEEE', '#96CDCD', '#388E8E', '#79CDCD', '#D1EEEE', '#8FD8D8', '#66CCCC', '#ADEAEA', '#70DBDB', '#AEEEEE', '#AFEEEE', '#8DEEEE', '#37FDFC', '#008080', '#008B8B', '#00CDCD', '#00EEEE', '#00FFFF', '#00FFFF', '#97FFFF', '#BBFFFF', '#E0FFFF', '#F0FFFF', '#00CED1', '#5F9EA0', '#00868B', '#00C5CD', '#00E5EE', '#00F5FF', '#67E6EC', '#4A777A', '#05EDFF', '#53868B', '#73B1B7', '#05E9FF', '#7AC5CD', '#8EE5EE', '#05B8CC', '#98F5FF', '#B0E0E6', '#C1F0F6', '#39B7CD', '#65909A', '#0EBFE9','#C3E4ED', '#68838B', '#63D1F4', '#9AC0CD', '#50A6C2', '#ADD8E6', '#B2DFEE', '#00688B', '#0099CC', '#009ACD', '#00B2EE', '#00BFFF', '#BFEFFF', '#33A1C9', '#507786', '#87CEEB', '#38B0DE', '#0BB5FF', '#42C0FB', '#6996AD', '#539DC2', '#236B8E', '#3299CC', '#0198E1', '#33A1DE', '#607B8B', '#35586C', '#5D92B1', '#8DB6CD', '#325C74', '#A4D3EE', '#82CFFD', '#67C8FF', '#B0E2FF', '#87CEFA', '#6CA6CD', '#4A708B', '#9BC4E2', '#7EC0EE', '#87CEFF', '#517693', '#5D7B93', '#42647F', '#4682B4', '#4F94CD', '#5CACEE', '#63B8FF', '#525C65', '#36648B', '#62B1F6', '#74BBFB', '#F0F8FF', '#4E78A0', '#0D4F8B', '#708090', '#708090', '#778899', '#778899', '#6183A6', '#9FB6CD', '#7D9EC0', '#104E8B', '#1874CD', '#1C86EE', '#60AFFE', '#007FFF', '#1E90FF', '#6C7B8B', '#B7C3D0', '#739AC5', '#75A1D0', '#B9D3EE', '#499DF5', '#C6E2FF', '#3B6AA0', '#7AA9DD', '#0276FD', '#003F87', '#6E7B8B', '#506987', '#A2B5CD', '#4372AA', '#26466D', '#1D7CF2', '#687C97','#344152', '#50729F', '#4973AB', '#B0C4DE', '#3063A5', '#BCD2EE', '#7EB6FF', '#CAE1FF', '#4D71A3', '#2B4F81', '#4981CE', '#88ACE0', '#5993E5', '#3A66A7', '#3579DC', '#5190ED', '#42526C', '#4D6FAC', '#2C5197', '#6495ED', '#6D9BF1', '#5B90F6', '#1464F4', '#3A5894', '#7093DB', '#1B3F8B', '#5971AD', '#0147FA', '#3D59AB', '#27408B', '#3A5FCD', '#4169E1', '#436EEE', '#003EFF', '#4876FF', '#A9ACB6', '#22316C', '#162252', '#3B4990', '#283A90', '#6F7285', '#838EDE', '#E6E8FA', '#7D7F94', '#2E37FE', '#2F2F4F', '#42426F', '#8F8FBC', '#5959AB', '#7171C6', '#D9D9F3', '#23238E', '#3232CC', '#3232CD', '#191970', '#E6E6FA', '#000033', '#000080', '#00008B', '#00009C', '#0000CD', '#0000EE', '#0000FF', '#3333FF', '#4D4DFF', '#6666FF', '#AAAAFF', '#CCCCFF', '#F8F8FF', '#5B59BA', '#120A8F', '#302B54', '#483D8B', '#473C8B', '#3B3178', '#6A5ACD', '#6959CD', '#7A67EE', '#8470FF', '#836FFF', '#7B68EE', '#3300FF', '#5D478B', '#9F79EE', '#8968CD','#9370DB', '#AB82FF', '#6600FF', '#380474']]


var width, height

function resize() { cnvs.width = width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); cnvs.height = height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); }
resize();

window.addEventListener("resize", resize);
window.addEventListener("mousemove", mouseMove, false)
window.addEventListener("click", mouseClick, false)
window.addEventListener("mousewheel", mouseWheel, false)
window.addEventListener("keypress", function(event){ if (event.keyCode == 82) restart()})

var mouseX
var mouseY

function mouseWheel(event){
	if (event.wheelDeltaY == 120) mouseRadius += 10
	if (event.wheelDeltaY == -120) mouseRadius -= 10
}

function mouseMove(event){
	mouseX = event.offsetX
	mouseY = event.offsetY
}

function mouseClick(event){
	creator = true
	for (b = 0; b < noBollards; b ++){
		if (Math.sqrt(Math.pow(bollards[b].x - mouseX, 2) + Math.pow(bollards[b].y - mouseY, 2)) < mouseRadius){
			creator = false
			noBollards--
			bollards.splice(b, 1)
		}
	}
	if (creator) {
		noBollards++
		bollards.push({x: mouseX, y: mouseY, r: mouseRadius})
	}
}


//initialising array
var balls = []
var bollards = []

//url:  gravity, no balls, min radius, max radius, velocity, collisions
urlVariables = location.href.split("?")[1].split(",")

//variables
var noBollards = 0
var noBalls = +urlVariables[1]
var radius = {min: +urlVariables[2], max: +urlVariables[3]} 			//min, max
var velocity = {min: -urlVariables[4], max: +urlVariables[4]}
var gravity = +urlVariables[0]				//global gravity
var spawn = {x: 10, y: 50,  w: width - 50, h: height - 50}	//limits for ball to spawn inside
var collisions = +urlVariables[5]
var mouseRadius = 30
colors = colors[0]


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
	//color = ("0" + (x / width) * 0xff).toString(16).substr(-2).repeat(3);
	ctx.beginPath(x, y)
	ctx.arc(x, y, radius, 0, Math.PI * 2)
	ctx.strokeStyle = "black"
	ctx.stroke()
	ctx.fillStyle = color
	ctx.fill()
}

function clearScreen(){
	ctx.clearRect(0, 0, width, height)
}

function populateBalls(){
	for (b = 0 ; b < noBalls ; b ++){
		balls.push({x: randNum(spawn.x, spawn.w), y: randNum(spawn.y, spawn.h), vx: randNum(velocity.min, velocity.max), vy: randNum(velocity.min, velocity.max), r: randNum(radius.min, radius.max), c: colors[parseInt(randNum(0, colors.length))]})
	}
}

function drawBalls(){
	//draw all balls
	for (b = 0 ; b < noBalls ; b ++){
		ball = balls[b]
				
		drawCircle(ball.x, ball.y, ball.r, ball.c)
	}
	
	//draw bollards
	for (b = 0 ; b < noBollards ; b++){
		bollard = bollards[b]
		drawCircle(bollard.x, bollard.y, bollard.r, "rgba(40, 220, 255, 0.6)")
	}
	
	//draw mouse position
	drawCircle(mouseX, mouseY, mouseRadius, "rgba(255, 70, 90, 0.8")
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

function mouseCollisions(){
	for (b = 0; b < noBalls; b++){
		ball = balls[b]
		if ((Math.sqrt(Math.pow(ball.x - mouseX, 2) + Math.pow(ball.y - mouseY, 2)) < ball.r + mouseRadius)){
			//the mouse acts as ball 1 with a huge radius(mass)
			
			//asignning deltaX and deltaY for the positions of the balls
			deltaX = balls[b].x - mouseX
			deltaY = balls[b].y - mouseY
			
			//initialising the  current normal and tangental velocities to the collision for each ball
			normVel2 = normalVel(b)
			tangVel2 = tangentVel(b)
			
			//applying the "momentum" function to these velocities to work out the post colliison velocities
			xNormVels = momentum(0, normVel2.x, 100000000000000, balls[b].r)
			yNormVels = momentum(0, normVel2.y, 100000000000000, balls[b].r)

			//reassigning the post collision velocities	
			normVel2.x = xNormVels[1]
			normVel2.y = yNormVels[1]

			//setting the actual velocities of the balls to the sum of the normal and tangental velocities	
			balls[b].vx = normVel2.x + tangVel2.x
			balls[b].vy = normVel2.y + tangVel2.y
			
			
		}
	}
}

function bollardCollisions(){
	for (bol = 0; bol < noBollards; bol++){
		for (bal = 0; bal < noBalls; bal++){
			bollard = bollards[bol]
			ball = balls[bal]
			if (overlap(bollard.x, bollard.y, ball.x + ball.vx, ball.y + ball.vy, bollard.r, ball.r)){
				
				//asignning deltaX and deltaY for the positions of the balls
				deltaX = balls[bal].x - bollard.x
				deltaY = balls[bal].y - bollard.y
				
				//initialising the  current normal and tangental velocities to the collision for each ball
				normVel2 = normalVel(bal)
				tangVel2 = tangentVel(bal)
				
				//applying the "momentum" function to these velocities to work out the post colliison velocities
				xNormVels = momentum(0, normVel2.x, 100000000000000, balls[bal].r)
				yNormVels = momentum(0, normVel2.y, 100000000000000, balls[bal].r)

				//reassigning the post collision velocities	
				normVel2.x = xNormVels[1]
				normVel2.y = yNormVels[1]

				//setting the actual velocities of the balls to the sum of the normal and tangental velocities	
				balls[bal].vx = normVel2.x + tangVel2.x
				balls[bal].vy = normVel2.y + tangVel2.y
				
			}
		}
	}
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

function restart(){
	balls = []
	populateBalls()
}

function update(){

	wallCollisions()
	if (collisions == 1) ballCollisions()
	//mouseCollisions()
	bollardCollisions()	
	applyGravity()
	updateBallPositions()
	clearScreen()
	drawBalls()
}

populateBalls();
//balls = [{x: 50, y:150, vx: 3, vy: 0, r: 30}, {x: 200, y:100, vx: 0, vy: 0, r: 30}]

setInterval(update, 15)
