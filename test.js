class Clock {
    constructor(state) {
        this.x = state.x;
        this.y = state.y;
        this.size = state.size;

        this.hr = 8;
        this.min = 60;
        console.log(this);
    }

    show() {
        translate(this.x, this.y)
        fill('#56679F');
        stroke('#C2ADB3');
        strokeWeight(this.size / 45);
        ellipse(0, 0, this.size);
        
        stroke('#3B2B30');
        strokeWeight(this.size / 40);
        point(0, 0);
        
        strokeWeight(this.size / 80);
        rotate(180);
        this.min += 0.1;
        this.minuteHand(); 
        this.hourHand(); 
    }

    minuteHand() {
        push();
        this.min %= 60;
        rotate(this.min * 6);
        line(0, 0, 0, this.size / 2.1);
        pop();
    }

    hourHand() {
        push();
        this.hr %= 12;
        rotate(this.hr * 30);
        line(0, 0, 0, this.size / 2.5);
        pop();
    }

    checkClick() {

    }

    onClick() {

    }
}