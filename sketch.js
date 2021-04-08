let canv;
let digit;
let clocksConfig;
let d = 0;

function preload() {
    clocksConfig = loadJSON('./digitConfig.json');
}

function setup() {
    canv = createCanvas(800, 600);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canv.position(x, y);
    initialization();
}

function draw() {
    background('#2B3350');
    let i = clocksConfig.labels.indexOf((floor(d) % 10)+'');
    digit.show(i);
    d += 0.02;
}

function mousePressed() {
    // digit.checkClick();
}

function keyPressed() {
    // digit.keyClick(key);
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