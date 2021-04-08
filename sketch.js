let canv;
let digit;


function setup() {
    canv = createCanvas(800, 600);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canv.position(x, y);
    initialization();
}

function draw() {
    background('#2B3350');
    digit.show();
}

function mousePressed() {
    digit.checkClick();
}

function keyPressed() {
    digit.keyClick(key);
}

function windowResized() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canv.position(x, y);
}

function initialization() {
    angleMode(DEGREES);
    let config = {
        x: 50,
        y: 50,
        size: 27,
        rows: 10,
        columns: 6,
    }

    digit = new Digit(config);
}