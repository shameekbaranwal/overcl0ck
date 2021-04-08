class Clock {
    constructor(state) {
        this.x = state.x;
        this.y = state.y;
        this.size = state.size;

        this.config = state.config;
    }

    show(index) {
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
        this.line(0, index); 
        this.line(1, index); 
    }

    line(num, i) {
        push();
        let angle = parseInt(this.config[num + i]) * 45;
        rotate(angle);
        line(0, 0, 0, this.size / 2.1);
        pop();
    }
    
    checkClick() {

    }

    onClick() {

    }
}