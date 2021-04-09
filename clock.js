//every individual clock is an instance of this class.

class Clock {
    constructor(state) {
        //position of the parent chunk (digit)
        this.parentX = state.parentX;
        this.parentY = state.parentY;

        //centre of the clock
        this.x = state.x;
        this.y = state.y;
        this.size = state.size;
        //stores all the configurations of the current clock for each digit
        this.config = state.config;

        //for the animation of each hand
        this.increment = 0;
        this.incrementDivisor = state.incrementDivisor; //effectively the inverse of speed for animating hands

        //stores the current configuration of the two hands as the multiple of 45 
        this.configCurrent = [0, 0];
        //stores the current configuration of the two lines as the actual angle in degrees. 
        this.currentAngles = [0, 0];
        //out of all the pairs of octal numbers in this.config (here, 10 pairs - one for each digit)
        //this stores which one is the current state of this clock. 
        this.currentIndex = -1;
        //stores the previous configuration of the two lines as the actual angle in degrees (for animation) 
        this.prevAngles = [0, 0];
        this.prevIndex = -1; //stores the index of previous state of the clock, for animating.

        this.lineThickness = this.size / 15;
    }

    show(index) {
        this.currentIndex = index;
        if (this.prevIndex === -1) //so that this assignment occurs only the first time show() is called
            this.prevIndex = index;

        push();
        translate(this.parentX, this.parentY); //because the clock has to move with parent chunk of clocks
        translate(this.x, this.y);

        //drawing the clock
        fill(CLOCK_COLOUR); //global
        stroke('#C2ADB3'); //outline of the clock
        strokeWeight(this.size / 100);
        if (CLOCKS_INVISIBLE) {
            noStroke(); //outline of clock would not be drawn if clocks are invisible
            noFill();
        }
        ellipse(0, 0, this.size);

        //drawing a point in the middle
        stroke('#3B2B30');
        strokeWeight(this.size / 40);
        point(0, 0);

        //drawing the lines
        rotate(180); //to get the lines to point up by default
        this.line(0); //first hand
        this.line(1); //second hand

        pop();
    }

    line(num) {
        push();
        stroke(LINE_COLOUR);

        //gets the current pair of angles for the state of the clock.
        //the state which, if just changed to, has to be animated TO. 
        //FROM the previous state.
        this.configCurrent = this.getConfig(this.currentIndex);
        this.currentAngles = this.getAngle(this.configCurrent);

        this.setLineStroke();

        //if this current index is the same as the index in the previous iteration of the loop,
        //then no animation needed, just draw the two lines like normal.
        if (this.currentIndex === this.prevIndex) {
            rotate(this.currentAngles[num]);
            line(0, 0, 0, this.size / 2.1);
        }
        //else, if the current state is different compared to before, then: <<pseudo-code ahead> 
        /*
            this.increment is, by default, equal to zero.
            It gets changed with the first iteration of this loop.
            So I can run a command in if(!this.increment) if I want it to be ran only once.
            Now, if we have reached this state, that means we want to animate from previous state to current state.
            So, first of all, get the previous state and store it in this.prevAngles[].
            Find the difference between previous state and current (target) state (which is in this.currentAngles[])
            Divide that difference by some factor, this factor should be a factor of 45, so the animation is concluded
            in an integer number of frames.
            Increase the prevAngles by the divided difference.
            Continue doing this and increase the prevAngles (cyclically) till you have reached the angle you needed it -
            this.currentAngles.
            Once it has reached this.currentAngles[], conclude the animations by setting prevIndex = currentIndex and
            resetting the increment.
        */
        else { //for animating between states
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

    //To animate and change the thickness of the clock hands according to position 
    setLineStroke() {
        //if the hands are coinciding and facing up - i.e. the default position, then reduce its thickness
        if (this.currentAngles[0] % 360 === 0 && this.currentAngles[1] % 360 === 0) {
            if (this.lineThickness < 0.5) {
                this.lineThickness = 0.5;
            } else {
                this.lineThickness -= 0.07;
            }
            if (CLOCKS_INVISIBLE) //a mode triggered by clicking the mouse
                this.lineThickness = 0;
        } else {
            if (this.lineThickness >= this.size / 15) {
                this.lineThickness = this.size / 15;
            } else {
                this.lineThickness += 0.1;
            }
        }
        strokeWeight(this.lineThickness);

    }

    //next THREE for the config generator, irrelevant now
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
    getCurrentConfig() {
        return (this.configCurrent[0] + '' + this.configCurrent[1]);
    }

    getConfig(i) {
        return [this.config[i * 2], this.config[i * 2 + 1]];
    }

    getAngle(n) {
        return [parseInt(n[0]) * 45, parseInt(n[1] * 45)];
    }
}