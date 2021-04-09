class Digit {
    constructor(config) {
        //position of the first clock's centre
        this.x = config.x;
        this.y = config.y;
        //pixel diameter of each clock (27)
        this.size = config.size;
        this.rows = config.rows; //(10)
        this.columns = config.columns; //(6)
        this.clocks = [];
        this.data = [];
        this.speed = config.speed;
        this.initializeClocks();
    }

    initializeClocks() {
        let n = 0;
        for (let i = 0; i < this.columns; i++) {
            for (let j = 0; j < this.rows; j++) {
                let x = i * this.size;
                let y = j * this.size;
                let state = {
                    size: this.size,
                    x,
                    y,
                    parentX: this.x,
                    parentY: this.y,
                    config: clocksConfig.data[n++], 
                    incrementDivisor: 5 * this.speed,
                };
                this.clocks.push(new Clock(state));
            }
        }
    }

    show(index) {
        this.clocks.forEach(clock => clock.show(index));
    }

    checkClick() {
        this.clocks.forEach(clock => clock.checkClick());
    }

    keyClick(key) {
        if (key === 's' || key === 'S') {
            let configs = {
                labels: [
                    '0',
                    '1',
                    '2',
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9',
                ],
                data: this.data
            };
            saveJSON(configs, "data");
        }

        if (key === 'r' || key === 'R') {
            this.clocks.forEach((clock, index) => this.data[index] = (this.data[index] || '') + clock.getCurrentConfig());
            console.log(this.data);
        }

        if (key === 'd' || key === 'D') {
            for(let i in this.data)
                this.data[i] = this.data[i].substring(0, this.data[i].length - 2) || '';
        }
    }
}