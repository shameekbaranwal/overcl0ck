let canv;

let clocksConfig;
let configurations;

let hr, hrDigits = [],
    min, minDigits = [],
    sec, secDigits = [];
let i;
let CLOCKS_INVISIBLE = false;

let BACKGROUND_COLOUR;
let CLOCK_COLOUR;
let LINE_COLOUR;

let FONT_ID;
let THEME;
let MODE;

let h1;
// console.log(h1);
let p;

let CANVAS_RATIO = 0.7; //if the page is opened in landscape mode (considered default)

function preload() {
    configurations = loadJSON('./config.json');
}

/////////////////////////////////////////////////////////

function setup() {
    if (windowHeight >= windowWidth) //if the page is opened in portrait mode
        CANVAS_RATIO = 0.9;

    canv = createCanvas(windowWidth * CANVAS_RATIO, 0.75 * windowWidth * CANVAS_RATIO);

    if (windowHeight <= windowWidth && windowHeight <= 0.75 * windowWidth) {
        // CANVAS_RATIO = 0.9;
        resizeCanvas(windowHeight * 1.33 * CANVAS_RATIO, windowHeight * CANVAS_RATIO);
    }

    // var x = (windowWidth - width) / 2;
    // var y = (windowHeight - height) / 1.8;
    // canv.position(x, y);
    initialization();
}

function draw() {
    background(BACKGROUND_COLOUR);
    noFill();
    stroke(240);
    strokeWeight(0.5);
    rect(0, 0, width - 1, height - 1);

    // if (frameCount % 5 === 0)
    // LINE_COLOUR = [random(100, 255), random(100, 255), random(100, 255)];

    drawHours();
    drawMinutes();
    drawSeconds();
}

function initialization() {
    angleMode(DEGREES);
    FONT_ID = 0;
    clocksConfig = configurations.digit_font_styles[FONT_ID];
    setupHours();
    setupMinutes();
    setupSeconds();

    MODE = 0;
    THEME = 0;

    h1 = select('#title')
    p = select('#description')

    setMode();
    setTheme();



    canv.parent('clock');
}

function mousePressed() {
    if (mouseButton === LEFT) {
        if (mouseX > width / 2 && mouseX < width) {
            if (mouseY > height / 2 && mouseY < height) {
                THEME++;
                setTheme();
            } else if (mouseY < height / 2 && mouseY > 0) {
                MODE++;
                setMode();
            }
        } else if (mouseX < width / 2 && mouseX > 0) {
            changeClockVisbility();
        }
    }
}

function setTheme() {
    THEME = THEME % configurations.colour_themes.length;
    LINE_COLOUR = configurations.colour_themes[THEME].LINE[MODE];
}

function setMode() {
    MODE = MODE % configurations.modes.length;
    CLOCK_COLOUR = configurations.modes[MODE].CLOCK;
    BACKGROUND_COLOUR = configurations.modes[MODE].BACKGROUND;
    setTheme();
    document.bgColor = BACKGROUND_COLOUR;
    h1.style('color', `rgb(${(1-MODE) * 255}, ${(1-MODE) * 255}, ${(1-MODE) * 255})`);
    p.style('color', `rgb(${(1-MODE) * 255}, ${(1-MODE) * 255}, ${(1-MODE) * 255})`);
}

function changeClockVisbility() {
    CLOCKS_INVISIBLE = !CLOCKS_INVISIBLE;
}

function setupHours() {
    let config = {
        x: normalize(50),
        y: normalize(50),
        size: normalize(27),
        rows: 10,
        columns: 6,
        speed: 2.7, //right now, the lower this is, the faster the animation gets. Will refactor later.
    }
    // hr = 17; //debugging
    hrDigits[0] = new Digit(config); //10s digit of hour
    config.x = config.x + config.columns * config.size + normalize(15);
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
        x: normalize(440),
        y: normalize(50),
        size: normalize(27),
        rows: 10,
        columns: 6,
        speed: 2, //right now, the lower this is, the faster the animation gets. Will refactor later.
    }

    // min = 52; // debugging
    minDigits.push(new Digit(config)); //10s digit of min
    config.x = config.x + config.columns * config.size + normalize(15);
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
        x: normalize(240),
        y: normalize(330),
        size: normalize(27),
        rows: 10,
        columns: 6,
        speed: 0.5, //right now, the lower this is, the faster the animation gets. Will refactor later.
    }

    // sec = 19; // debugging
    secDigits.push(new Digit(config)); //10s digit of sec
    config.x = config.x + config.columns * config.size + normalize(15);
    secDigits.push(new Digit(config)); //1s digit of sec
}

function drawSeconds() {
    sec = second();
    i = clocksConfig.labels.indexOf(floor((sec / 10) % 10) + '');
    secDigits[0].show(i);
    i = clocksConfig.labels.indexOf(sec % 10 + '');
    secDigits[1].show(i);
}

function normalize(value) {
    return width * (value / 800);
}