'use strict';

let cnvs = document.getElementById('cnvs');
let ctx = cnvs.getContext('2d');

let colors = ['#7fed11','#89e80c','#93e208','#9ddb05','#a6d402','#b0cd01','#b9c400','#c2bc00','#cab300','#d2aa02','#d9a004','#e09607','#e68c0b','#ec820f','#f17814','#f56e1a','#f86420','#fb5b27','#fd512f','#fe4837','#ff3f3f','#fe3748','#fd2f51','#fb275b','#f82064','#f51a6e','#f11478','#ec0f82','#e60b8c','#e00796','#d904a0','#d202aa','#ca00b3','#c200bc','#b900c4','#b001cd','#a602d4','#9d05db','#9308e2','#890ce8','#7f11ed','#7516f2','#6b1cf6','#6123f9','#582afc','#4e31fd','#453afe','#3c42fe','#344bfe','#2c54fc','#255efa','#1e68f7','#1872f3','#127cef','#0d86ea','#0990e4','#069ade','#03a3d7','#01adcf','#00b6c7','#00bfbf','#00c7b6','#01cfad','#03d7a3','#06de9a','#09e490','#0dea86','#12ef7c','#18f372','#1ef768','#25fa5e','#2cfc54','#34fe4b','#3cfe42','#45fe3a','#4efd31','#58fc2a','#61f923','#6bf61c','#75f216'];

function fit_to_screen(){
    cnvs.width  = innerWidth;
    cnvs.height = innerHeight;
    spawn = {x: radius.max, y: radius.max,  w: cnvs.width - radius.max * 2, h: cnvs.height - radius.max * 2};
}

//initialising arrays
let balls = [];
let bollards = [];

//variables
let mouse = {x: undefined, y: undefined, r: 30, ss: 20};
let no_balls = 16;
let radius = {min: 2, max: 32};
let velocity = 128;
let gravity = 9.8;
let cor = 1;
let collisions = true;
let tracing = false;
let outline = true;
let menu = false;
let menuButton = {x: 10, y: 10, w: 120, h: 70};
let menuPadding = 20;
let menuRows = [
    {tag: 'decrease', val: ()=>'increase', unit: '', lc: ()=>'', rc: ()=>''},
    {tag: 'number of balls', val: ()=>no_balls, unit: '(num)', lc: ()=> no_balls /= 2, rc: ()=> no_balls *= 2},
    {tag: 'gravity', val: ()=>Math.round(gravity*10)/10, unit: '(pix/sec^2)', lc: ()=> gravity-=2.45, rc: ()=> gravity += 2.45},
    {tag: 'start velocity', val: ()=>velocity, unit: '(pix/sec)', lc: ()=> velocity -= 10, rc: ()=> velocity += 10},
    {tag: 'minimum radius', val: ()=>radius.min, unit: '(pix)', lc: ()=> radius.min /= 2, rc: ()=> radius.min *= 2},
    {tag: 'maximum radius', val: ()=>radius.max, unit: '(pix)', lc: ()=> radius.max /= 2, rc: ()=> radius.max *= 2},
    {tag: 'coeff. of restitution', val: ()=>Math.round(cor*10)/10, unit: '', lc: ()=> cor -= 0.1, rc: ()=> cor += 0.1},
    {tag: 'ball collisions', val: ()=>collisions, unit: '', lc: ()=> collisions = !collisions, rc: ()=> collisions = !collisions},
    {tag: 'tracing', val: ()=>tracing, unit: '', lc: function(){tracing=!tracing}, rc: function(){exit_menu(); tracing=!tracing}},
    {tag: 'exit/restart', val: ()=>"('r')", unit: '', lc: exit_menu, rc: exit_menu}
];
let spawn;
let time_delta_s;
let last_time_ms = -1;

fit_to_screen();

/*******************
  EVENT LISTENERS
*******************/

window.addEventListener('resize',     fit_to_screen);
window.addEventListener('mousemove',  mouse_move);
window.addEventListener('click',      mouse_click);
window.addEventListener('mousewheel', mouse_wheel);
window.addEventListener('keypress',   key_press);

function mouse_wheel(event){
    mouse.r += event.wheelDeltaY > 0 ? mouse.ss : mouse.r > mouse.ss ? -mouse.ss : 0;
}

function mouse_move(event){
    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
}

function mouse_click(event){
    if (menu){
        let clicked = Math.ceil(mouse.y / ( cnvs.height / menuRows.length)) - 1;
        mouse.x < cnvs.width / 2 ? menuRows[clicked].lc() : menuRows[clicked].rc();
    } else {
        if ((mouse.x < menuButton.x + menuButton.w) && (mouse.x > menuButton.x) && (mouse.y < menuButton.y + menuButton.h) && (mouse.y > menuButton.y)){
            menu = true;
            return;
        }
        let creator = true;
        for (let b = 0; b < bollards.length; b++){
            if (Math.sqrt(Math.pow(bollards[b].x - mouse.x, 2) + Math.pow(bollards[b].y - mouse.y, 2)) < mouse.r){
                creator = false;
                bollards.splice(b, 1);
                b--;
            }
        }
        if (creator) {
            bollards.push({x: mouse.x, y: mouse.y, r: mouse.r});
        }
    }
}

function key_press(e){
    if (e.key == 'r'){
        restart();
    }
}

/******************
   UTILITY FUNCS
******************/

//distance between two objects with x,y attrs.
function dist(c1, c2){
    return ((c2.x - c1.x) ** 2 + (c2.y - c1.y) ** 2) ** 0.5;
}

//resizes spawn for any radii changes and restarts
function exit_menu(){
    menu = false;
    spawn = {x: radius.max, y: radius.max,  w: cnvs.width - radius.max * 2, h: cnvs.height - radius.max * 2};
    ctx.clearRect(0,0,cnvs.width,cnvs.height);
    restart();
}

//random float (incl. min, excl. max)
function rand_num(min, max){
    return Math.random() * (max - min) + min;
}

//takes two objects with centres and radii and returns if the circles overlap
function overlap(b1, b2){
    if (dist(b1, b2) < b1.r + b2.r){
        return true;
    }
    return false;
}

//returns final velocities of masses after a 1d collision
function momentum(u1, u2, m1, m2){
    let v1 = (u1 * (m1 - m2) + 2 * m2 * u2) / (m1 + m2);
    let v2 = (u2 * (m2 - m1) + 2 * m1 * u1) / (m1 + m2);
    return [v1, v2];
}

//draws a circle on the main canvas
function draw_circle(x, y, radius, color){
    //color = ('0' + (x / cnvs.width) * 0xff).toString(16).substr(-2).repeat(3);
    ctx.beginPath(x, y);
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    if (outline){
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
    ctx.fillStyle = color;
    ctx.fill();
}

//blanks the canvas for next update
function clear_screen(){
    if (tracing) return;
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
}

function populate_balls(){
    for (let b = 0; b < no_balls; b++){
        balls.push({x:  rand_num(spawn.x, spawn.x + spawn.w),
                    y:  rand_num(spawn.y, spawn.y +  spawn.h),
                    vx: rand_num(velocity * -1, velocity),
                    vy: rand_num(velocity * -1, velocity),
                    r: rand_num(radius.min, radius.max),
                    c: colors[parseInt(rand_num(0, colors.length))]});
    }
}

function draw_balls(){
    //draw all balls
    for (let b = 0; b < balls.length; b++){
        let ball = balls[b];
        draw_circle(ball.x, ball.y, ball.r, ball.c);
    }
    //draw bollards
    for (let b = 0; b < bollards.length; b++){
        let bollard = bollards[b];
        draw_circle(bollard.x, bollard.y, bollard.r, 'rgba(40, 220, 255, 0.6)');
    }
    //draw mouse position
    draw_circle(mouse.x, mouse.y, mouse.r > 0 ? mouse.r : 0, 'rgba(255, 70, 90, 0.8');
}

//adds the ball's velocities to their coordinates and applies gravity
function update_ball_positions(){
    for (let b = 0; b < balls.length; b++){
        let ball = balls[b];
        ball.x += time_delta_s * ball.vx;
        ball.y += time_delta_s * ball.vy + 0.5 * gravity * time_delta_s;
    }
}

//adds the gravity acceleration to the ball's vertical velocities
function apply_gravity(){
    for (let b = 0; b < balls.length; b++){
        balls[b].vy += gravity * time_delta_s;
    }
}

function wallCollisions(){
    for (let i = 0; i < balls.length; i++){
        let ball = balls[i];
        let nx = ball.x + ball.vx * time_delta_s;
        let ny = ball.y + ball.vy * time_delta_s;
        if (nx - ball.r < 0  || nx + ball.r > cnvs.width){
            ball.x = nx; //move ball over wall so on next update, it as if it has bounced
            ball.vx *= -1 * cor;
        }
        if (ny - ball.r < 0 || ny + ball.r > cnvs.height){
            ball.y = ny;
            ball.vy *= -1 * cor;
        }
    }
}

function ballCollisions(){
    if (!collisions) return
    for (let b1 = 0; b1 < balls.length; b1++ ){
        for (let b2 = b1 + 1;  b2 < balls.length; b2++){
            let next_b1 = {x: balls[b1].x + balls[b1].vx * time_delta_s,
                           y: balls[b1].y + balls[b1].vy * time_delta_s,
                           r: balls[b1].r};
            let next_b2 = {x: balls[b2].x + balls[b2].vx * time_delta_s,
                           y: balls[b2].y + balls[b2].vy * time_delta_s,
                           r: balls[b2].r};
            if (overlap(next_b1, next_b2)){
                //asignning deltaX and deltaY for the positions of the balls
                let deltaX = balls[b2].x - balls[b1].x;
                let deltaY = balls[b2].y - balls[b1].y;

                //initialising the  current normal and tangental velocities to the collision for each ball
                let normVel1 = normalVel(deltaX, deltaY, b1);
                let normVel2 = normalVel(deltaX, deltaY, b2);
                let tangVel1 = tangentVel(deltaX, deltaY, b1);
                let tangVel2 = tangentVel(deltaX, deltaY, b2);

                //applying the 'momentum' function to these velocities to work out the post collison velocities
                let xNormVels = momentum(normVel1.x, normVel2.x, Math.pow(balls[b1].r, 2), Math.pow(balls[b2].r, 2));
                let yNormVels = momentum(normVel1.y, normVel2.y, Math.pow(balls[b1].r, 2), Math.pow(balls[b2].r, 2));

                //reassigning the post collision velocities
                normVel1.x = xNormVels[0] * cor;
                normVel2.x = xNormVels[1] * cor;
                normVel1.y = yNormVels[0] * cor;
                normVel2.y = yNormVels[1] * cor;

                //setting the actual velocities of the balls to the sum of the normal and tangental velocities
                balls[b1].vx = normVel1.x + tangVel1.x;
                balls[b1].vy = normVel1.y + tangVel1.y;

                balls[b2].vx = normVel2.x + tangVel2.x;
                balls[b2].vy = normVel2.y + tangVel2.y;
            }
        }
    }
}

function normalVel(deltaX, deltaY, b){
     let k = (-1 / (deltaY * deltaY + deltaX * deltaX)) * ((-1 * deltaX * balls[b].vx) - (deltaY * balls[b].vy));
     let nX = k * deltaX;
     let nY = k * deltaY;
     return {x: nX, y: nY};
}

function tangentVel(deltaX, deltaY, b){
     let k = (-1 / (deltaY * deltaY + deltaX * deltaX)) * ((deltaY * balls[b].vx) - (deltaX * balls[b].vy));
     let tX = k * -1 * deltaY;
     let tY = k * deltaX;
     return {x: tX, y: tY};
}


function bollardCollisions(){
    for (let bol = 0; bol < bollards.length; bol++){
        for (let bal = 0; bal < balls.length; bal++){
            let bollard = bollards[bol];
            let ball = balls[bal];
            let next_ball = {x: ball.x + ball.vx * time_delta_s,
                             y: ball.y + ball.vy * time_delta_s,
                             r: ball.r}
            if (overlap(ball, bollard)){
                //asignning deltaX and deltaY for the positions of the balls
                let deltaX = ball.x - bollard.x;
                let deltaY = ball.y - bollard.y;

                //initialising the  current normal and tangental velocities to the collision for each ball
                let normVel2 = normalVel(deltaX, deltaY, bal);
                let tangVel2 = tangentVel(deltaX, deltaY, bal);

                //applying the 'momentum' function to these velocities to work out the post colliison velocities
                let xNormVels = momentum(0, normVel2.x, 100000000000000, ball.r);
                let yNormVels = momentum(0, normVel2.y, 100000000000000, ball.r);

                //reassigning the post collision velocities
                normVel2.x = xNormVels[1] * cor;
                normVel2.y = yNormVels[1] * cor;

                //setting the actual velocities of the balls to the sum of the normal and tangental velocities  
                ball.vx = normVel2.x + tangVel2.x;
                ball.vy = normVel2.y + tangVel2.y;
            }
        }
    }
}

function restart(){
    menu = false;
    ctx.clearRect(0,0,cnvs.width,cnvs.height);
    balls = [];
    populate_balls();
}

function draw_menu(){
    if (menu){
        for (let r = 0; r < menuRows.length; r++){
            let font_sz = cnvs.height / 25;
            let row = menuRows[r];
            let row_height = (cnvs.height - (menuRows.length + 1) * menuPadding) / menuRows.length;
            ctx.fillStyle = 'rgba(255, 150, 114, 0.5)';
            ctx.fillRect(menuPadding, menuPadding * (r+1) + r * row_height, cnvs.width - 2 * menuPadding, row_height);
            ctx.font = font_sz.toString() + 'px courier';
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.textAlign = 'end';
            ctx.fillText(row.tag + ' : ', cnvs.width / 2, menuPadding + font_sz / 4 + (menuPadding + row_height) * r + row_height / 2);
            ctx.textAlign = 'start';
            ctx.fillText(row.val().toString() + row.unit, cnvs.width / 2, menuPadding + font_sz / 4 + (menuPadding + row_height) * r + row_height / 2);
        }
    } else {
        ctx.fillStyle = 'rgba(255, 150, 114, 0.5)';
        ctx.fillRect(menuButton.x, menuButton.y, menuButton.w, menuButton.h);
        ctx.textAlign = 'center';
        ctx.font = '20px courier';
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillText('menu', menuButton.x + menuButton.w / 2, menuButton.y + menuButton.h / 2 + 5);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
    }
}

function update(time_ms){
    time_delta_s = last_time_ms == -1 ? 0 : (time_ms - last_time_ms) / 1000;
    last_time_ms = time_ms;

    //start by introducing gravity
    apply_gravity();

    //check and modify velocities if any collisions
    wallCollisions();
    ballCollisions();
    bollardCollisions();

    //update the balls' positions based on their velocities
    update_ball_positions();


    //clear and draw balls and menu
    clear_screen();

    draw_balls()
    //draw menu (either the button to enter menu or the 
    draw_menu();

    requestAnimationFrame(update);
}

populate_balls();

requestAnimationFrame(update);
