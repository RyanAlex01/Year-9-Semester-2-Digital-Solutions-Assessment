var points = 40;
var maxSpeed = 15;
var minSpeed = 5;
var dots = [];

// var inconsolata;
// function preload() {
//   inconsolata = loadFont("/Inconsolata.otf");
// }

function setup() {
    canvas = createCanvas(400, 150); //, WEBGL);
    canvas.parent("logo-div")
    canvas.id("logo-canvas")

    for (var i = 0; i<points; i++) {
        dots.push(new dot_class());
    }

    // textFont(inconsolata);
    textSize(80);
    textAlign(CENTER, CENTER);
    textFont("Georgia");
    textStyle(BOLD);
}

function draw() {
    deltaTime = deltaTime/1000;
    background(86, 95, 99);
    
    colorMode(RGB);
    for (var d = 0; d<dots.length; d++) {
        let dot = dots[d];
        let nearby_points = dot.link(dots);
        for (var n = 0; n<nearby_points.length; n++) {
            strokeWeight(2);
            stroke(34, 35, 36);
            let od = nearby_points[n];
            line(dot.x, dot.y, od.x, od.y);
        }
    }
    for (var d = 0; d<dots.length; d++) {
        let dot = dots[d];
        stroke(152, 157, 163);
        strokeWeight(6);
        point(dot.x, dot.y);
        dot.update();
    }

    // let time = millis();
    // rotateX(time / 1000);
    // rotateZ(time / 1234);

    strokeWeight(6);
    stroke(176, 49, 66);
    fill(224, 61, 83);
    text("R-y-an", width/2, height/2);
}

class dot_class {
    constructor() {
      this.x = int(random(0, width));
      this.y = int(random(0, height));
      this.Xspeed = int(random(minSpeed, maxSpeed)) * random([1, -1]);
      this.Yspeed = int(random(minSpeed, maxSpeed)) * random([1, -1]);
    }
    update() {
        this.x += this.Xspeed * deltaTime;
        this.y += this.Yspeed * deltaTime;
        this.x += (this.x>width ? -width : (this.x<0 ? width : 0));
        this.y += (this.y>height ? -height : (this.y<0 ? height : 0));
    }
    link(all_points) {
        let max_range = 50;
        let nearby = [];
        for (let p = 0; p<all_points.length; p++) {
            let other_dot = dots[p];
            if (dist(this.x, this.y, other_dot.x, other_dot.y) < max_range) {
                nearby.push(other_dot);
            }
        }
        return nearby;
    }
}