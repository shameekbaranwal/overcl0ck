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
        this.currentIndex = 1000;
        //stores the previous configuration of the two lines as the actual degree (for animation) 
        this.prevAngles = [0, 0];
        this.prevIndex = 1000;
        //stores all the configurations of the current clock for each digit
        this.config = state.config;

        this.increment = 0;
        this.incrementDivisor = state.incrementDivisor;

        this.lineThickness = this.size / 15;
    }

    show(index) {
        if (this.prevIndex === 1000)
            this.prevIndex = index;
        this.currentIndex = index;
        push();
        //because the clock has to move with parent chunk of clocks
        translate(this.parentX, this.parentY);
        translate(this.x, this.y)
        fill('#2B3350');
        stroke('#C2ADB3');
        strokeWeight(this.size / 60);
        ellipse(0, 0, this.size);

        stroke('#3B2B30');
        strokeWeight(this.size / 40);
        point(0, 0);

        rotate(180); //to get the lines to point up by default
        this.line(0, index);
        this.line(1, index);
        pop();
    }

    line(num, i) {
        push();
        stroke('orange');

        this.configCurrent = this.getConfig(this.currentIndex);
        this.currentAngles = this.getAngle(this.configCurrent);

        this.setLineStroke();

        if (this.currentIndex === this.prevIndex) {
            rotate(this.currentAngles[num]);
            line(0, 0, 0, this.size / 2.1);
        } else { //for animating between states
            if (!this.increment) {
                this.prevConfig = this.getConfig(this.prevIndex);
                this.prevAngles = this.getAngle(this.prevConfig);
            }

            this.increment = (this.currentAngles[num] - this.prevAngles[num]) / this.incrementDivisor;
            this.prevAngles[num] = (this.prevAngles[num] + this.increment) % 360;
            rotate(this.prevAngles[num]);
            line(0, 0, 0, this.size / 2.1);

            if (this.prevAngles[num] === this.currentAngles[num]) {
                this.prevIndex = this.currentIndex;
                this.increment = 0;
            }
        }
        pop();
    }

    checkClick() {
        if (dist(this.x + this.parentX, this.y + this.parentY, mouseX, mouseY) <= this.size / 2) {
            // this.onClick();
        }
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

    getConfig(i) {
        return [this.config[i * 2], this.config[i * 2 + 1]];
    }

    getAngle(n) {
        return [parseInt(n[0]) * 45, parseInt(n[1] * 45)];
    }

    getCurrentConfig() {
        return (this.configCurrent[0] + '' + this.configCurrent[1]);
    }

    setLineStroke() {
        if (this.currentAngles[0] % 360 === 0 && this.currentAngles[1] % 360 === 0) {
            if (this.lineThickness < 0.5) {
                this.lineThickness = 0.5;
            } else {
                this.lineThickness -= 0.07;
            }
        } else {
            if (this.lineThickness >= this.size / 15) {
                this.lineThickness = this.size / 15;
            } else {
                this.lineThickness += 0.1;
            }
        }
        strokeWeight(this.lineThickness);

    }
}