'use strict';

/*
 * TODO:
 * - coefficient of restitution (not in right places and not at all in bollards)
 * - floor behaviour - balls phase through after a while...
 *
 */

let cnvs = document.getElementById('cnvs');
let ctx = cnvs.getContext('2d');

let colors = ['#7fed11','#89e80c','#93e208','#9ddb05','#a6d402','#b0cd01','#b9c400','#c2bc00','#cab300','#d2aa02','#d9a004','#e09607','#e68c0b','#ec820f','#f17814','#f56e1a','#f86420','#fb5b27','#fd512f','#fe4837','#ff3f3f','#fe3748','#fd2f51','#fb275b','#f82064','#f51a6e','#f11478','#ec0f82','#e60b8c','#e00796','#d904a0','#d202aa','#ca00b3','#c200bc','#b900c4','#b001cd','#a602d4','#9d05db','#9308e2','#890ce8','#7f11ed','#7516f2','#6b1cf6','#6123f9','#582afc','#4e31fd','#453afe','#3c42fe','#344bfe','#2c54fc','#255efa','#1e68f7','#1872f3','#127cef','#0d86ea','#0990e4','#069ade','#03a3d7','#01adcf','#00b6c7','#00bfbf','#00c7b6','#01cfad','#03d7a3','#06de9a','#09e490','#0dea86','#12ef7c','#18f372','#1ef768','#25fa5e','#2cfc54','#34fe4b','#3cfe42','#45fe3a','#4efd31','#58fc2a','#61f923','#6bf61c','#75f216'];

function fit_to_screen(){
    cnvs.height = cnvs.width = innerHeight; //update to change dynamically
}

//initialising arrays
let balls = [];
let bollards = [];

//variables to be initialised by url params
let gravity;
let cor;
let collisions;
let tracing;
let time_delta_s;
let last_time_ms = -1;

/* the simulation is done in the coordinate system of the bulder canvas,
 * but then in the draw_screen() function, coordinates are mapped back to
 * this canvases coordinate system
 */
let builder_size;


/******************
      MAIN LOOP
*******************/

function update(time_ms){
    time_delta_s = last_time_ms == -1 ? 0 : (time_ms - last_time_ms) / 1000;
    last_time_ms = time_ms;

    //start by introducing gravity
    apply_gravity();

    //check and modify velocities if any collisions
    wall_collisions();
    ball_collisions();
    bollard_collisions();

    //update the balls' positions based on their velocities
    update_ball_positions();

    //re-draw
    clear_screen();
    draw_screen();

    requestAnimationFrame(update);
}

fit_to_screen();

load_url_params();

requestAnimationFrame(update);

/******************
   UTILITY FUNCS
******************/

function load_url_params(){
    let data = JSON.parse(decodeURIComponent(location.href.split('?')[1]));
    let spawn_areas = data.spawn_areas;
    bollards = data.bollards;
    tracing = data.tracing; collisions = data.collisions;
    gravity = data.gravity; cor = data.cor;
    builder_size = data.size;
    for (let spawn of spawn_areas){
        for (let i = 0; i < spawn.no_balls; i++){
            let vel_components = get_vel_components(
                rand_num(spawn.min_vel, spawn.max_vel),
                spawn.vel_angle == -1 ? rand_num(0, 360) : 360-spawn.vel_angle
            );
            balls.push({
                x: rand_num(spawn.x, spawn.x + spawn.w),
                y: rand_num(spawn.y, spawn.y +  spawn.h),
               vx: vel_components.x,
               vy: vel_components.y,
                r: rand_num(spawn.min_radius, spawn.max_radius),
                c: colors[parseInt(rand_num(0, colors.length))],
            });
        }
    }
}

function get_vel_components(r, theta){
    //theta is magnitude, theta is angle in degrees
    return {x: r * Math.cos(theta * (Math.PI / 180)),
            y: r * Math.sin(theta * (Math.PI / 180))};
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

function draw_screen(){
    //draw the balls
    for (let ball of balls){
        draw_circle(ball.x/builder_size*cnvs.width,
                    ball.y/builder_size*cnvs.width,
                    ball.r/builder_size*cnvs.width, ball.c);
    }
    //draw bollards
    for (let bollard of bollards){
        switch (bollard.type){
            case 'rect':
                fill_polygon(bollard.points.map(p=>({x:p.x/builder_size*cnvs.width,
                                                     y:p.y/builder_size*cnvs.width})),
                                                     '#4efd');
                break;
            case 'circle':
                //not implemented yet
                break;
        }
    }
}

//adds the ball's velocities to their coordinates and applies gravity
function update_ball_positions(){
    for (let b = 0; b < balls.length; b++){
        let ball = balls[b];
        ball.x += time_delta_s * ball.vx;
        ball.y += time_delta_s * ball.vy;
    }
}

//adds the gravity acceleration to the ball's vertical velocities
function apply_gravity(){
    for (let b = 0; b < balls.length; b++){
        balls[b].vy += gravity * time_delta_s;
    }
}

function wall_collisions(){
    for (let i = 0; i < balls.length; i++){
        let ball = balls[i];
        let nx = ball.x + ball.vx * time_delta_s;
        let ny = ball.y + ball.vy * time_delta_s;
        //set ball's position to over the wall so comes back in same position
        if (nx - ball.r < 0  || nx + ball.r > builder_size){
            ball.vx *= -1 * cor;
            ball.x = ball.x + -ball.vx * time_delta_s;
        }
        if (ny - ball.r < 0 || ny + ball.r > builder_size){
            ball.vy *= -1 * cor;
            ball.y = ball.y + -ball.vy * time_delta_s;
        }
    }
}

function ball_collisions(){
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
                let normVel1 = normal_vel(deltaX, deltaY, b1);
                let normVel2 = normal_vel(deltaX, deltaY, b2);
                let tangVel1 = tangent_vel(deltaX, deltaY, b1);
                let tangVel2 = tangent_vel(deltaX, deltaY, b2);

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

function normal_vel(deltaX, deltaY, b){
     let k = (-1 / (deltaY * deltaY + deltaX * deltaX)) * ((-1 * deltaX * balls[b].vx) - (deltaY * balls[b].vy));
     let nX = k * deltaX;
     let nY = k * deltaY;
     return {x: nX, y: nY};
}

function tangent_vel(deltaX, deltaY, b){
     let k = (-1 / (deltaY * deltaY + deltaX * deltaX)) * ((deltaY * balls[b].vx) - (deltaX * balls[b].vy));
     let tX = k * -1 * deltaY;
     let tY = k * deltaX;
     return {x: tX, y: tY};
}

function bollard_collisions(){
    //SPLIT THIS FUNCTION TO AN INDIVIDUAL bollard_collision(ball_index) function
    for (let i = 0; i < balls.length; i++){
        let collided = false;
        //nxtb is next ball
        let nxtb = {x: balls[i].x + balls[i].vx * time_delta_s,
                    y: balls[i].y + balls[i].vy * time_delta_s,
                    r: balls[i].r}
        for (let bollard of bollards){
            switch (bollard.type){
                case 'rect':
                    //array of [sidex, sidey, opp. sidex, opp. sidey]
                    let sides = [[0,1,3,2],[1,2,0,3],[2,3,1,0],[0,3,1,2]];
                    for (let side of sides){
                        let cs = side.map(c=>bollard.points[c]);
                        if (Math.abs(point_line_dist(nxtb, cs[0], cs[1])) < nxtb.r && //if hitting this side...
                            point_line_dist(nxtb, cs[0], cs[2]) * //and in between edge sides
                            point_line_dist(nxtb, cs[1], cs[3]) < 0) {//== dist(cs[0], cs[1])){
                            //see papers for calculations (var meanings) ~done on 19/1/19
                            let dx = cs[1].x - cs[0].x;
                            let dy = cs[1].y - cs[0].y;
                            let a = (dx*balls[i].vx+dy*balls[i].vy)/(dx*dx+dy*dy);
                            let b = (dx*balls[i].vx-dx*balls[i].vy)/(dx*dx+dy*dy);
                            let vel_tang = {x: dx * a, y:  dy * a};
                            let vel_norm = {x: dy * b, y: -dx * b};
                            //reverse normal component
                            vel_norm.x *= -1;
                            vel_norm.y *= -1;
                            //reassign components
                            balls[i].vx = vel_tang.x + vel_norm.x;
                            balls[i].vy = vel_tang.y + vel_norm.y;

                            collided = true;
                        }
                    }
                    break;
                case 'circle':
                    break;
            }
            if (collided) break;
        }
        if (collided) break;
    }
    return;
    //////////////
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
                let normVel2 = normal_vel(deltaX, deltaY, bal);
                let tangVel2 = tangent_vel(deltaX, deltaY, bal);

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

function point_line_dist(p, c1, c2){
    //returns distance between p and the line with c1 and c2 on it
    //see papers for calculations
    return (-p.x*(c2.y-c1.y)+p.y*(c2.x-c1.x)+c1.x*c2.y-c2.x*c1.y)/dist(c1,c2);
}

//distance between two objects with x,y attrs.
function dist(c1, c2){
    return ((c2.x - c1.x) ** 2 + (c2.y - c1.y) ** 2) ** 0.5;
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
    //http://farside.ph.utexas.edu/teaching/301/lectures/node76.html
    let v1 = (u1 * (m1 - m2) + 2 * m2 * u2) / (m1 + m2);
    let v2 = (u2 * (m2 - m1) + 2 * m1 * u1) / (m1 + m2);
    return [v1, v2];
}

//draws a circle on the main canvas
function draw_circle(x, y, radius, color){
    //color = ('0' + (x / cnvs.width) * 0xff).toString(16).substr(-2).repeat(3);
    ctx.beginPath(x, y);
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

//blanks the canvas for next update
function clear_screen(){
    if (tracing) return;
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
}

function fill_polygon(points, color){
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++){
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
}
