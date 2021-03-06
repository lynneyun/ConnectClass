// Inspired by The Nature of Code by Daniel Shiffman
// https://thecodingtrain.com/learning/nature-of-code/4.1-particle-emitters.html


class Emitter {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.particles = [];
    }

    emit() {
        if (frameCount % frameSpeed == 0) {
            this.particles.push(new Particle(this.position.x, this.position.y));
        }
    }

    update() {
        for (let particle of this.particles) {
            particle.applyMouseForce();
            particle.update();
            // particle.edges()
        }


        for (let i = this.particles.length - 1; i >= 0; i--) {
            if (this.particles[i].finished()) {
                this.particles.splice(i, 1);
            }
        }
    }

    show() {
        for (let particle of this.particles) {
            particle.show();
        }
    }
}