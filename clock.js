class Clock {
    constructor(state) {
        //position of the parent chunk
        this.parentX = state.parentX;
        this.parentY = state.parentY;

        //centre of the clock
        this.x = state.x;
        this.y = state.y;
        this.size = state.size;

        //stores the current configuration of the two lines as the multiple of 45 
        this.configCurrent = [0, 0];
        //stores the current configuration of the two lines as the actual degree 
        this.currentAngles = [0, 0];
        //stores the previous configuration of the two lines as the actual degree (for animation) 
        this.prevAngles = [0, 0];
        //stores all the configurations of the current clock for each digit
        this.config = state.config;
    }

    show(index) {
        push();
        //because the clock has to move with parent chunk of clocks
        translate(this.parentX, this.parentY);
        translate(this.x, this.y)
        fill('#56679F');
        stroke('#C2ADB3');
        strokeWeight(this.size / 45);
        ellipse(0, 0, this.size);

        stroke('#3B2B30');
        strokeWeight(this.size / 40);
        point(0, 0);

        strokeWeight(this.size / 15);
        rotate(180); //to get the lines to point up by default
        this.line(0, index);
        this.line(1, index);
        pop();
    }

    line(num, i) {
        push();
        stroke('orange');

        if (i !== undefined) //to implement a bodged version of overloading
            this.configCurrent = [this.config[i], this.config[i + 1]];

        this.currentAngles[num] = parseInt(this.configCurrent[num]) * 45;
        rotate(this.currentAngles[num]);
        line(0, 0, 0, this.size / 2.1);
        pop();
    }

    checkClick() {
        if (dist(this.x + this.parentX, this.y + this.parentY, mouseX, mouseY) <= this.size / 2)
            this.onClick();
    }

    onClick() {
        if (mouseButton === LEFT) {
            console.log('left clicked')
            this.configCurrent[0] += 1;
            this.configCurrent[0] %= 8;
        }
        if (mouseButton === CENTER) {
            console.log('right clicked')
            this.configCurrent[1] += 1;
            this.configCurrent[1] %= 8;
        }
    }

    getCurrentConfig() {
        return (this.configCurrent[0] + '' + this.configCurrent[1]);
    }
}