cnvs = document.getElementById("cnvs")
ctx = cnvs.getContext("2d")
normColors = ['#800000', '#8B0000', '#B22222', '#FF0000', '#FA8072', '#FF6347', '#FF7F50', '#FF4500', '#D2691E', '#F4A460', '#FF8C00', '#FFA500', '#B8860B', '#DAA520', '#FFD700', '#808000', '#FFFF00', '#9ACD32', '#ADFF2F', '#7FFF00', '#7CFC00', '#008000', '#00FF00', '#32CD32', '#00FF7F', '#00FA9A', '#40E0D0', '#20B2AA', '#8D1CC"', '#008080', '#008B8B', '#00FFFF', '#00FFFF', '#00CED1', '#00BFFF', '#1E90FF', '#4169E1', '#000080', '#00008B', '#0000CD', '#0000FF', '#8A2BE2', '#9932CC', '#9400D3', '#800080', '#8B008B', '#FF00FF', '#FF00FF', '#C71585', '#FF1493', '#F69B4"', '#DC143C', '#A52A2A', '#CD5C5C', '#BC8F8F', '#F08080', '#FFFAFA', '#FFE4E1', '#E9967A', '#FFA07A', '#A0522D', '#FFF5EE', '#8B4513', '#FFDAB9', '#CD853F', '#FAF0E6', '#FFE4C4', '#DEB887', '#D2B48C', '#FAEBD7', '#FFDEAD', '#FFEBCD', '#FFEFD5', '#FFE4B5', '#F5DEB3', '#FDF5E6', '#FFFAF0', '#FFF8DC', '#F0E68C', '#FFFACD', '#EEE8AA', '#BDB76B', '#F5F5DC', '#FAFAD2', '#FFFFE0', '#FFFFF0', '#6B8E23', '#556B2F', '#8FBC8F', '#006400', '#228B22', '#90EE90', '#98FB98', '#F0FFF0', '#2E8B57', '#3CB371', '#F5FFFA', '#66CDAA', '#7FFFD4', '#2F4F4F', '#AFEEEE', '#E0FFFF', '#F0FFFF', '#5F9EA0', '#B0E0E6', '#ADD8E6', '#87CEEB', '#87CEFA', '#4682B4', '#F0F8FF', '#708090', '#778899', '#B0C4DE', '#6495ED', '#E6E6FA', '#F8F8FF', '#191970', '#6A5ACD', '#483D8B', '#7B68EE', '#9370DB', '#4B0082', '#BA55D3', '#DDA0DD', '#EE82EE', '#D8BFD8', '#DA70D6', '#FFF0F5', '#DB7093', '#FFC0CB', '#FFB6C1', '#000000', '#696969', '#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC', '#F5F5F5', '#FFFFFF']
secondColors = ['#838B8B', '#7A8B8B', '#C1CDCD', '#668B8B', '#B4CDCD', '#2F4F4F', '#2F4F4F', '#5F9F9F', '#C0D9D9', '#528B8B', '#E0EEEE', '#96CDCD', '#388E8E', '#79CDCD', '#D1EEEE', '#8FD8D8', '#66CCCC', '#ADEAEA', '#70DBDB', '#AEEEEE', '#AFEEEE', '#8DEEEE', '#37FDFC', '#008080', '#008B8B', '#00CDCD', '#00EEEE', '#00FFFF', '#00FFFF', '#97FFFF', '#BBFFFF', '#E0FFFF', '#F0FFFF', '#00CED1', '#5F9EA0', '#00868B', '#00C5CD', '#00E5EE', '#00F5FF', '#67E6EC', '#4A777A', '#05EDFF', '#53868B', '#73B1B7', '#05E9FF', '#7AC5CD', '#8EE5EE', '#05B8CC', '#98F5FF', '#B0E0E6', '#C1F0F6', '#39B7CD', '#65909A', '#0EBFE9','#C3E4ED', '#68838B', '#63D1F4', '#9AC0CD', '#50A6C2', '#ADD8E6', '#B2DFEE', '#00688B', '#0099CC', '#009ACD', '#00B2EE', '#00BFFF', '#BFEFFF', '#33A1C9', '#507786', '#87CEEB', '#38B0DE', '#0BB5FF', '#42C0FB', '#6996AD', '#539DC2', '#236B8E', '#3299CC', '#0198E1', '#33A1DE', '#607B8B', '#35586C', '#5D92B1', '#8DB6CD', '#325C74', '#A4D3EE', '#82CFFD', '#67C8FF', '#B0E2FF', '#87CEFA', '#6CA6CD', '#4A708B', '#9BC4E2', '#7EC0EE', '#87CEFF', '#517693', '#5D7B93', '#42647F', '#4682B4', '#4F94CD', '#5CACEE', '#63B8FF', '#525C65', '#36648B', '#62B1F6', '#74BBFB', '#F0F8FF', '#4E78A0', '#0D4F8B', '#708090', '#708090', '#778899', '#778899', '#6183A6', '#9FB6CD', '#7D9EC0', '#104E8B', '#1874CD', '#1C86EE', '#60AFFE', '#007FFF', '#1E90FF', '#6C7B8B', '#B7C3D0', '#739AC5', '#75A1D0', '#B9D3EE', '#499DF5', '#C6E2FF', '#3B6AA0', '#7AA9DD', '#0276FD', '#003F87', '#6E7B8B', '#506987', '#A2B5CD', '#4372AA', '#26466D', '#1D7CF2', '#687C97','#344152', '#50729F', '#4973AB', '#B0C4DE', '#3063A5', '#BCD2EE', '#7EB6FF', '#CAE1FF', '#4D71A3', '#2B4F81', '#4981CE', '#88ACE0', '#5993E5', '#3A66A7', '#3579DC', '#5190ED', '#42526C', '#4D6FAC', '#2C5197', '#6495ED', '#6D9BF1', '#5B90F6', '#1464F4', '#3A5894', '#7093DB', '#1B3F8B', '#5971AD', '#0147FA', '#3D59AB', '#27408B', '#3A5FCD', '#4169E1', '#436EEE', '#003EFF', '#4876FF', '#A9ACB6', '#22316C', '#162252', '#3B4990', '#283A90', '#6F7285', '#838EDE', '#E6E8FA', '#7D7F94', '#2E37FE', '#2F2F4F', '#42426F', '#8F8FBC', '#5959AB', '#7171C6', '#D9D9F3', '#23238E', '#3232CC', '#3232CD', '#191970', '#E6E6FA', '#000033', '#000080', '#00008B', '#00009C', '#0000CD', '#0000EE', '#0000FF', '#3333FF', '#4D4DFF', '#6666FF', '#AAAAFF', '#CCCCFF', '#F8F8FF', '#5B59BA', '#120A8F', '#302B54', '#483D8B', '#473C8B', '#3B3178', '#6A5ACD', '#6959CD', '#7A67EE', '#8470FF', '#836FFF', '#7B68EE', '#3300FF', '#5D478B', '#9F79EE', '#8968CD','#9370DB', '#AB82FF', '#6600FF', '#380474']
rainbowColors = [ "rgb(127,237,17)", "rgb(137,232,12)", "rgb(147,226,8)", "rgb(157,219,5)", "rgb(166,212,2)", "rgb(176,205,1)", "rgb(185,196,0)", "rgb(194,188,0)", "rgb(202,179,0)", "rgb(210,170,2)", "rgb(217,160,4)", "rgb(224,150,7)", "rgb(230,140,11)", "rgb(236,130,15)", "rgb(241,120,20)", "rgb(245,110,26)", "rgb(248,100,32)", "rgb(251,91,39)", "rgb(253,81,47)", "rgb(254,72,55)", "rgb(255,63,63)", "rgb(254,55,72)", "rgb(253,47,81)", "rgb(251,39,91)", "rgb(248,32,100)", "rgb(245,26,110)", "rgb(241,20,120)", "rgb(236,15,130)", "rgb(230,11,140)", "rgb(224,7,150)", "rgb(217,4,160)", "rgb(210,2,170)", "rgb(202,0,179)", "rgb(194,0,188)", "rgb(185,0,196)", "rgb(176,1,205)", "rgb(166,2,212)", "rgb(157,5,219)", "rgb(147,8,226)", "rgb(137,12,232)", "rgb(127,17,237)", "rgb(117,22,242)", "rgb(107,28,246)", "rgb(97,35,249)", "rgb(88,42,252)", "rgb(78,49,253)", "rgb(69,58,254)", "rgb(60,66,254)", "rgb(52,75,254)", "rgb(44,84,252)", "rgb(37,94,250)", "rgb(30,104,247)", "rgb(24,114,243)", "rgb(18,124,239)", "rgb(13,134,234)", "rgb(9,144,228)", "rgb(6,154,222)", "rgb(3,163,215)", "rgb(1,173,207)", "rgb(0,182,199)", "rgb(0,191,191)", "rgb(0,199,182)", "rgb(1,207,173)", "rgb(3,215,163)", "rgb(6,222,154)", "rgb(9,228,144)", "rgb(13,234,134)", "rgb(18,239,124)", "rgb(24,243,114)", "rgb(30,247,104)", "rgb(37,250,94)", "rgb(44,252,84)", "rgb(52,254,75)", "rgb(60,254,66)", "rgb(69,254,58)", "rgb(78,253,49)", "rgb(88,252,42)", "rgb(97,249,35)", "rgb(107,246,28)", "rgb(117,242,22)"]
colors = rainbowColors
centreGoalBolards = [{"x":493,"y":508,"r":330},{"x":1133,"y":382,"r":290},{"x":804,"y":978,"r":210},{"x":1184,"y":857,"r":170},{"x":1369,"y":689,"r":60},{"x":1446,"y":571,"r":60},{"x":1426,"y":828,"r":60},{"x":1470,"y":730,"r":30},{"x":1485,"y":664,"r":30},{"x":1462,"y":468,"r":30},{"x":1391,"y":928,"r":30},{"x":1051,"y":1031,"r":30},{"x":1122,"y":1066,"r":30},{"x":1027,"y":1104,"r":30},{"x":571,"y":882,"r":30},{"x":483,"y":874,"r":30},{"x":516,"y":970,"r":60},{"x":388,"y":893,"r":50},{"x":782,"y":177,"r":90},{"x":915,"y":93,"r":50},{"x":625,"y":140,"r":50},{"x":527,"y":127,"r":30},{"x":1009,"y":74,"r":30},{"x":671,"y":202,"r":10},{"x":849,"y":93,"r":10},{"x":894,"y":169,"r":10},{"x":982,"y":115,"r":10},{"x":1362,"y":604,"r":20},{"x":1361,"y":775,"r":10},{"x":1424,"y":748,"r":10},{"x":1422,"y":495,"r":10},{"x":1369,"y":886,"r":10},{"x":1035,"y":988,"r":10},{"x":1096,"y":1029,"r":10},{"x":1076,"y":1081,"r":10},{"x":1017,"y":1063,"r":10},{"x":576,"y":1034,"r":10},{"x":421,"y":978,"r":30},{"x":609,"y":845,"r":20},{"x":525,"y":856,"r":10},{"x":808,"y":306,"r":30},{"x":1275,"y":675,"r":20},{"x":693,"y":94,"r":20},{"x":1919,"y":336,"r":20},{"x":920,"y":160,"r":10},{"x":880,"y":148,"r":10},{"x":887,"y":196,"r":10},{"x":688,"y":224,"r":10},{"x":679,"y":178,"r":10},{"x":558,"y":169,"r":10},{"x":688,"y":127,"r":10},{"x":1056,"y":87,"r":10},{"x":968,"y":52,"r":10},{"x":1313,"y":631,"r":10},{"x":580,"y":926,"r":10},{"x":451,"y":924,"r":10},{"x":1176,"y":1054,"r":20},{"x":1091,"y":1126,"r":30},{"x":981,"y":1137,"r":20},{"x":1385,"y":764,"r":10},{"x":1356,"y":803,"r":10},{"x":1342,"y":758,"r":10},{"x":1444,"y":690,"r":10},{"x":1435,"y":425,"r":10},{"x":1483,"y":507,"r":10},{"x":346,"y":827,"r":10},{"x":550,"y":1040,"r":10},{"x":597,"y":1050,"r":10},{"x":446,"y":1010,"r":10},{"x":374,"y":960,"r":10},{"x":566,"y":97,"r":10},{"x":495,"y":161,"r":10},{"x":760,"y":287,"r":10},{"x":841,"y":268,"r":10},{"x":1050,"y":267,"r":0},{"x":650,"y":502,"r":0},{"x":440,"y":853,"r":10},{"x":524,"y":893,"r":10},{"x":648,"y":200,"r":10},{"x":1239,"y":676,"r":10},{"x":1296,"y":703,"r":10},{"x":1330,"y":612,"r":10},{"x":1483,"y":778,"r":10},{"x":1509,"y":703,"r":10},{"x":1505,"y":618,"r":10},{"x":1443,"y":394,"r":10},{"x":1465,"y":420,"r":10},{"x":1434,"y":905,"r":10},{"x":1349,"y":947,"r":10},{"x":1026,"y":953,"r":10},{"x":1208,"y":1043,"r":10},{"x":1166,"y":1087,"r":10},{"x":1138,"y":1111,"r":10},{"x":1437,"y":648,"r":10}]
smallScreenBolards = [{"x":493,"y":508,"r":330},{"x":1133,"y":382,"r":290},{"x":1369,"y":689,"r":60},{"x":1446,"y":571,"r":60},{"x":1426,"y":828,"r":60},{"x":1470,"y":730,"r":30},{"x":1485,"y":664,"r":30},{"x":1462,"y":468,"r":30},{"x":1391,"y":928,"r":30},{"x":782,"y":177,"r":90},{"x":915,"y":93,"r":50},{"x":625,"y":140,"r":50},{"x":527,"y":127,"r":30},{"x":1009,"y":74,"r":30},{"x":671,"y":202,"r":10},{"x":849,"y":93,"r":10},{"x":982,"y":115,"r":10},{"x":1362,"y":604,"r":20},{"x":1361,"y":775,"r":10},{"x":1424,"y":748,"r":10},{"x":1422,"y":495,"r":10},{"x":1369,"y":886,"r":10},{"x":808,"y":306,"r":30},{"x":1275,"y":675,"r":20},{"x":693,"y":94,"r":20},{"x":1919,"y":336,"r":20},{"x":688,"y":224,"r":10},{"x":679,"y":178,"r":10},{"x":558,"y":169,"r":10},{"x":688,"y":127,"r":10},{"x":1056,"y":87,"r":10},{"x":968,"y":52,"r":10},{"x":1313,"y":631,"r":10},{"x":1385,"y":764,"r":10},{"x":1356,"y":803,"r":10},{"x":1342,"y":758,"r":10},{"x":1444,"y":690,"r":10},{"x":1435,"y":425,"r":10},{"x":1483,"y":507,"r":10},{"x":566,"y":97,"r":10},{"x":495,"y":161,"r":10},{"x":760,"y":287,"r":10},{"x":841,"y":268,"r":10},{"x":1050,"y":267,"r":0},{"x":650,"y":502,"r":0},{"x":648,"y":200,"r":10},{"x":1239,"y":676,"r":10},{"x":1296,"y":703,"r":10},{"x":1330,"y":612,"r":10},{"x":1483,"y":778,"r":10},{"x":1509,"y":703,"r":10},{"x":1505,"y":618,"r":10},{"x":1443,"y":394,"r":10},{"x":1465,"y":420,"r":10},{"x":1434,"y":905,"r":10},{"x":1349,"y":947,"r":10},{"x":1437,"y":648,"r":10},{"x":1173,"y":863,"r":180},{"x":819,"y":899,"r":160},{"x":581,"y":907,"r":60},{"x":640,"y":982,"r":30},{"x":465,"y":881,"r":30},{"x":496,"y":936,"r":20},{"x":407,"y":857,"r":20},{"x":417,"y":895,"r":10},{"x":442,"y":922,"r":10},{"x":514,"y":861,"r":10},{"x":639,"y":837,"r":20},{"x":665,"y":809,"r":10},{"x":587,"y":991,"r":10},{"x":676,"y":1023,"r":10},{"x":897,"y":1059,"r":10},{"x":992,"y":946,"r":10},{"x":519,"y":994,"r":30},{"x":442,"y":974,"r":30},{"x":363,"y":895,"r":30},{"x":407,"y":932,"r":20},{"x":346,"y":839,"r":20},{"x":573,"y":1027,"r":20},{"x":615,"y":1029,"r":10},{"x":473,"y":1015,"r":10},{"x":389,"y":973,"r":10},{"x":361,"y":950,"r":10},{"x":315,"y":874,"r":10},{"x":307,"y":809,"r":10},{"x":305,"y":841,"r":10},{"x":1063,"y":1068,"r":10},{"x":603,"y":835,"r":10},{"x":648,"y":938,"r":10},{"x":649,"y":1032,"r":10},{"x":996,"y":1006,"r":40},{"x":941,"y":1047,"r":20},{"x":1057,"y":1035,"r":20},{"x":1025,"y":1060,"r":10},{"x":994,"y":1069,"r":10},{"x":1094,"y":1044,"r":10},{"x":1124,"y":1053,"r":10},{"x":898,"y":171,"r":20},{"x":883,"y":205,"r":10},{"x":928,"y":157,"r":10}]
var width, height

function resize() { 
	cnvs.width = width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); 
	cnvs.height = height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	if (radius)	spawn = {x: radius.max, y: radius.max,  w: width - radius.max * 2, h: height - radius.max * 2}
}
resize();

window.addEventListener("resize", resize);
window.addEventListener("mousemove", mouseMove, false)
window.addEventListener("click", mouseClick, false)
window.addEventListener("mousewheel", mouseWheel, false)
window.addEventListener("keydown", function(event){ if (event.keyCode == 82) restart()})

mouse = {x: -100, y: 100, r: 30}

function mouseWheel(event){
	if (event.wheelDeltaY == 120) mouse.r += 10
	if (event.wheelDeltaY == -120 && mouse.r > 0) mouse.r -= 10
}

function mouseMove(event){
	mouse.x = event.offsetX
	mouse.y = event.offsetY
}

function mouseClick(event){
	if (menu){
		clicked = Math.ceil(mouse.y / ( height / menuRows.length)) - 1
		mouse.x < width / 2 ? menuRows[clicked].lc() : menuRows[clicked].rc()	
	} else {
		if ((mouse.x < menuButton.x + menuButton.w) && (mouse.x > menuButton.x) && (mouse.y < menuButton.y + menuButton.h) && (mouse.y > menuButton.y)){
			menu = true
			return
		}
		creator = true
		for (b = 0; b < noBollards; b ++){
			if (Math.sqrt(Math.pow(bollards[b].x - mouse.x, 2) + Math.pow(bollards[b].y - mouse.y, 2)) < mouse.r){
				creator = false
				noBollards--
				bollards.splice(b, 1)
			}
		}
		if (creator) {
			noBollards++
			bollards.push({x: mouse.x, y: mouse.y, r: mouse.r})
		}
	}		
}


//initialising arrays
var balls = []
var bollards = []

/*
//url:  gravity, no balls, min radius, max radius, velocity, collisions
urlVariables = location.href.split("?")[1].split(",")
//url variables
var noBalls = +urlVariables[1]
var radius = {min: +urlVariables[2], max: +urlVariables[3]} 			//min, max
var velocity = urlVariables[4]
var gravity = +urlVariables[0]				//global gravity
var spawn = {x: radius.max, y: radius.max,  w: width - radius.max * 2, h: height - radius.max * 2}	//limits for ball to spawn inside
var collisions = +urlVariables[5]
*/

//variables
var noBalls = 128
var noBollards = 0
var radius = {min: 5, max: 5}
var spawn = {x: radius.max, y: radius.max,  w: width - radius.max * 2, h: height - radius.max * 2}	//limits for ball to spawn inside
var velocity = 90
var gravity = 9.8
var cor = 1
var collisions = true
var tracing = false
var outline = true
var fps = 30
var menu = false
var menuButton = {x: 10, y: 10, w: 120, h: 70}
var menuPadding = 20
var menuRows = [
	{tag: "decrease", val: ()=>"increase", unit: "", lc: ()=>"", rc: ()=>""},
	{tag: "number of balls", val: ()=>noBalls, unit: "(num)", lc: ()=> noBalls /= 2, rc: ()=> noBalls *= 2},
	{tag: "gravity", val: ()=>Math.round(gravity*10)/10, unit: "(pix/sec^2)", lc: ()=> gravity-=2.45, rc: ()=> gravity += 2.45},
	{tag: "start velocity", val: ()=>velocity, unit: "(pix/sec)", lc: ()=> velocity -= 10, rc: ()=> velocity += 10},
	{tag: "minimum radius", val: ()=>radius.min, unit: "(pix)", lc: ()=> radius.min /= 2, rc: ()=> radius.min *= 2},
	{tag: "maximum radius", val: ()=>radius.max, unit: "(pix)", lc: ()=> radius.max /= 2, rc: ()=> radius.max *= 2},
	{tag: "coeff. of restitution", val: ()=>Math.round(cor*10)/10, unit: "", lc: ()=> cor -= 0.1, rc: ()=> cor += 0.1},
	{tag: "ball collisions", val: ()=>collisions, unit: "", lc: ()=> collisions = !collisions, rc: ()=> collisions = !collisions},
	{tag: "tracing", val: ()=>tracing, unit: "", lc: function(){tracing=!tracing}, rc: function(){exitMenu(); tracing=!tracing}},
	{tag: "exit/restart", val: ()=>"('r')", unit: "", lc: exitMenu, rc: exitMenu}
]

function exitMenu(){
	menu = false
	spawn = {x: radius.max, y: radius.max,  w: width - radius.max * 2, h: height - radius.max * 2}
	ctx.clearRect(0,0,width,height)
	restart()
}

function getKe(){
	kE = 0
	balls.forEach(o => o.r * (kE += o.vx * o.vx + o.vy * o.vy))
	return kE
}

function randNum(min, max){					//returns random float including min, excluding max
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
	if (outline){
		ctx.strokeStyle = "black"
		ctx.stroke()
	}
	ctx.fillStyle = color
	ctx.fill()
}

function clearScreen(){
	if (tracing) return
	ctx.clearRect(0, 0, width, height)
}

function populateBalls(){
	for (b = 0 ; b < noBalls ; b ++){
		balls.push({x: randNum(spawn.x, spawn.x + spawn.w), y: randNum(spawn.y, spawn.y +  spawn.h), vx: randNum(velocity * -1, velocity) / fps, vy: randNum(velocity * -1, velocity) / fps, r: randNum(radius.min, radius.max), c: colors[parseInt(randNum(0, colors.length))]})
	}
}

function drawBalls(){
	//draw all balls
	for (b = 0 ; b < balls.length ; b ++){
		ball = balls[b]
				
		drawCircle(ball.x, ball.y, ball.r, ball.c)
	}
	
	//draw bollards
	for (b = 0 ; b < noBollards ; b++){
		bollard = bollards[b]
		drawCircle(bollard.x, bollard.y, bollard.r, "rgba(40, 220, 255, 0.6)")
	}
	
	//draw mouse position
	drawCircle(mouse.x, mouse.y, mouse.r > 0 ? mouse.r : 0, "rgba(255, 70, 90, 0.8")
}

function updateBallPositions(){
	for (b = 0 ; b < balls.length ; b ++){
		ball = balls[b]
		ball.x += ball.vx
		ball.y += ball.vy + 0.5 * (gravity / fps)
	}
}

function wallCollisions(){
	for (b = 0 ; b < balls.length ; b ++){
		ball = balls[b]
		if ((ball.x + ball.vx) - ball.r < 0 || (ball.x + ball.vx) + ball.r > width){
			ball.vx *= -1 * cor
			ball.x = Math.min(ball.x + ball.r, width) - ball.r;
		}
		if (ball.y + ball.vy - ball.r < 0 || ball.y + ball.vy + ball.r > height){
			ball.vy *= -1 * cor
			ball.y = Math.min(ball.y + ball.r, height) - ball.r;
		}
	}
}

function ballCollisions(){
	if (!collisions) return
	for (b1 = 0 ; b1 < balls.length ; b1 ++ ){
		for (b2 = b1 + 1 ; b2 < balls.length ; b2 ++){
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


	//applying the "momentum" function to these velocities to work out the post collison velocities
	xNormVels = momentum(normVel1.x, normVel2.x, Math.pow(balls[b1].r, 2), Math.pow(balls[b2].r, 2))
	yNormVels = momentum(normVel1.y, normVel2.y, Math.pow(balls[b1].r, 2), Math.pow(balls[b2].r, 2))

	//reassigning the post collision velocities	
	normVel1.x = xNormVels[0] * cor
	normVel2.x = xNormVels[1] * cor
	normVel1.y = yNormVels[0] * cor
	normVel2.y = yNormVels[1] * cor

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

function bollardCollisions(){
	for (bol = 0; bol < noBollards; bol++){
		for (bal = 0; bal < balls.length; bal++){
			bollard = bollards[bol]
			ball = balls[bal]
			if (overlap(bollard.x, bollard.y, ball.x + ball.vx, ball.y + ball.vy, bollard.r, ball.r)){
				
				//asignning deltaX and deltaY for the positions of the balls
				deltaX = ball.x - bollard.x
				deltaY = ball.y - bollard.y
				
				//initialising the  current normal and tangental velocities to the collision for each ball
				normVel2 = normalVel(bal)
				tangVel2 = tangentVel(bal)
				
				//applying the "momentum" function to these velocities to work out the post colliison velocities
				xNormVels = momentum(0, normVel2.x, 100000000000000, ball.r)
				yNormVels = momentum(0, normVel2.y, 100000000000000, ball.r)

				//reassigning the post collision velocities	
				normVel2.x = xNormVels[1] * cor
				normVel2.y = yNormVels[1] * cor

				//setting the actual velocities of the balls to the sum of the normal and tangental velocities	
				ball.vx = normVel2.x + tangVel2.x
				ball.vy = normVel2.y + tangVel2.y			
			}
		}
	}
}

function applyGravity(){
	for (b = 0 ; b < balls.length ; b ++ ){
		balls[b].vy += gravity / fps
	}
}

function restart(){
	menu = false
	ctx.clearRect(0,0,width,height)
	balls = []
	populateBalls()
}

function drawMenu(){
	if (menu){
		for (var r = 0; r < menuRows.length; r ++){
			row = menuRows[r]
			rowHeight = (height - (menuRows.length + 1) * menuPadding) / menuRows.length
			ctx.fillStyle = "rgba(255, 150, 114, 0.5)"
			ctx.fillRect(menuPadding, menuPadding * (r+1) + r * rowHeight, width - 2 * menuPadding, rowHeight)
			fontSize = height / 25
			ctx.font = fontSize.toString() + "px courier"
			ctx.fillStyle = "rgba(0,0,0,0.5)"
			ctx.textAlign = "end"
			ctx.fillText(row.tag + " : ", width / 2, menuPadding + fontSize / 4 + (menuPadding + rowHeight) * r + rowHeight / 2)
			ctx.textAlign = "start"
			ctx.fillText(row.val().toString() + row.unit, width / 2, menuPadding + fontSize / 4 + (menuPadding + rowHeight) * r + rowHeight / 2)
		}
	} else {
		ctx.fillStyle = "rgba(255, 150, 114, 0.5)"
		ctx.fillRect(menuButton.x, menuButton.y, menuButton.w, menuButton.h)
		ctx.textAlign = "center"
		ctx.font = "20px courier"
		ctx.fillStyle = "rgba(0,0,0,0.5)"
		ctx.fillText("menu", menuButton.x + menuButton.w / 2, menuButton.y + menuButton.h / 2 + 5)
		ctx.fillStyle = "rgba(255,255,255,0.5)"
		ctx.textAlign = "start"
		ctx.fillText("energy: " + Math.round(getKe()), 10, 100)
	}
}

function update(){

	applyGravity()

	//check and modify velocities if any collisions
	wallCollisions()
	ballCollisions()
	bollardCollisions()

	updateBallPositions()

	//clear and draw balls and menu
	clearScreen()

	drawBalls()
	//draw menu (either the button to enter menu or the 
	drawMenu();	
}

populateBalls();
//noBalls = 1
//balls = [{x: 50, y:150, vx: 100 / fps, vy: 60 / fps, r: 30, c: "green"}, {x: 200, y:100, vx: 0, vy: 0, r: 30, c: "red"}]

setInterval(update, 1000 / fps)


function mouseCollisions(){
	for (b = 0; b < balls.length; b++){
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
