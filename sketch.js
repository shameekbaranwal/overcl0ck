let canv;
// let digit;
let clocksConfig;
let hr, hrDigits = [],
    min, minDigits = [],
    sec, secDigits = [];
let i;
let CLOCKS_INVISIBLE = false;

// let CLOCK_COLOUR = '#2B3350';
let CLOCK_COLOUR = '#00000f';
let BACKGROUND_COLOUR = '#00000f';
// let LINE_COLOUR = '#FFCAE9';
// let LINE_COLOUR = '#75E4B3';
let LINE_COLOUR = '#ff4d4d';
// let LINE_COLOUR = '#FFB17A';

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
    background(BACKGROUND_COLOUR);

    drawHours();
    drawMinutes();
    drawSeconds();
}


function windowResized() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    canv.position(x, y);
}

function initialization() {
    angleMode(DEGREES);
    document.bgColor = BACKGROUND_COLOUR;
    setupHours();
    setupMinutes();
    setupSeconds();
}

function mousePressed() {
    if (mouseButton === LEFT)
        changeClockVisbility();
}

function changeClockVisbility() {
    CLOCKS_INVISIBLE = !CLOCKS_INVISIBLE;
}

function setupHours() {
    let config = {
        x: 50,
        y: 50,
        size: 27,
        rows: 10,
        columns: 6,
        speed: 2.7, //right now, the lower this is, the faster the animation gets. Will refactor later.
    }
    // hr = 17; //debugging
    hrDigits[0] = new Digit(config); //10s digit of hour
    config.x = config.x + config.columns * config.size + 15;
    hrDigits[1] = new Digit(config); //1s digit of hour
}

function drawHours() {
    hr = hour();
    i = clocksConfig.labels.indexOf(floor(hr / 10) % 10 + '');
    hrDigits[0].show(i);
    i = clocksConfig.labels.indexOf(hr % 10 + '');
    hrDigits[1].show(i);
}

function setupMinutes() {
    let config = {
        x: 440,
        y: 50,
        size: 27,
        rows: 10,
        columns: 6,
        speed: 2, //right now, the lower this is, the faster the animation gets. Will refactor later.
    }

    // min = 52; // debugging
    minDigits.push(new Digit(config)); //10s digit of min
    config.x = config.x + config.columns * config.size + 15;
    minDigits.push(new Digit(config)); //1s digit of min
}

function drawMinutes() {
    min = minute();
    i = clocksConfig.labels.indexOf(floor((min / 10) % 10) + '');
    minDigits[0].show(i);
    i = clocksConfig.labels.indexOf(min % 10 + '');
    minDigits[1].show(i);
}

function setupSeconds() {
    let config = {
        x: 240,
        y: 330,
        size: 27,
        rows: 10,
        columns: 6,
        speed: 0.5, //right now, the lower this is, the faster the animation gets. Will refactor later.
    }

    // sec = 19; // debugging
    secDigits.push(new Digit(config)); //10s digit of sec
    config.x = config.x + config.columns * config.size + 15;
    secDigits.push(new Digit(config)); //1s digit of sec
}

function drawSeconds() {
    sec = second();
    i = clocksConfig.labels.indexOf(floor((sec / 10) % 10) + '');
    secDigits[0].show(i);
    i = clocksConfig.labels.indexOf(sec % 10 + '');
    secDigits[1].show(i);
}