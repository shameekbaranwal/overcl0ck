let canv;
let clock;

function setup() {
    canv = createCanvas(600, 400);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canv.position(x, y);
    state = {
        x: width / 2,
        y: height / 2,
        size: width / 3,
        config: '25'
    };
    angleMode(DEGREES);
    clock = new Clock(state);
}

function draw() {
    background('#2B3350');
    clock.show(0);
}

function mousePressed() {

}

function windowResized() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canv.position(x, y);
}