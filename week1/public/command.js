class Command {
    constructor(chr, len, level) {
        this.chr = chr
        this.length = len + random(0, height * 0.03)
        this.angle = angle;
        this.homeAngle = angle;
        this.moveCount = random(0, 100); // initialized based on where you are in the tree or perlin noise?
        this.level = level; // level of tree
        this.offset = 0;
    }

    jitter() {
        if (this.angle) {
            this.moveCount += 0.01;
            this.offset = map(sin(this.moveCount), -1, 1, 0, 0.05);
            //this.offset = map(mouseX,0,width,0,0.05);
            // instead of mouseX it's perlin noise?
            //this.angle = this.homeAngle + offset;
        }
    }

    run() {
        if (this.chr == "F") {
            stroke(50 + this.level % 255);
            // console.log(this.level % 255);
            line(0, 0, 0, -this.length);
            fill(255);
            noStroke();
            // text(this.level, 0, 0);
            translate(0, -this.length);
        } else if (this.chr == "+") {
            rotate(this.angle + this.offset);
        } else if (this.chr == "-") {
            rotate(-this.angle - this.offset);
        } else if (this.chr == "[") {
            push();
        } else if (this.chr == "]") {
            pop();
        }
    }

}