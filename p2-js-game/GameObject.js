class GameObjects {
    constructor(config) {
        this.locationX = config.locationX || 0;
        this.locationY = config.locationY || 0;
        this.direction = config.directionMain || 'down';
        this.lastFrame = config.lastFrame;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || 'assets/character/people/DemoRpgCharacter.png',
        });
    }

    update() {

    }
}

class Person extends GameObjects {
    constructor(config) {
        super(config);

        this.mainCharacter = config.mainCharacter || false;
        this.npc = config.npc || false;

        this.directionMovement = {
            'up': ['locationY', -2],
            'down': ['locationY', 2],
            'left': ['locationX', -2],
            'right': ['locationX', 2]
        }
    }

    update(state) {
        this.updatePosition();
        this.updateSpriteDirection(state);

        if (this.mainCharacter && state.arrow) {
            this.direction = state.arrow;
        } else {
            this.direction = null;
        }

        if (this.npc) {
            const randomDirection = Object.keys(this.directionMovement);
            this.direction = randomDirection[Math.floor(Math.random() * 4)];
        }
    }

    updatePosition() {
        if(this.direction !== null) {
            let [property, change] = this.directionMovement[this.direction];
            this[property] += change;
        }
    }

    updateSpriteDirection(state) {
        if(this.direction != null) {
            this.sprite.changeAnimation(`walk-${this.direction}`);
            this.lastFrame = this.sprite.currentAnimationFrame;
        } else {
            this.sprite.currentAnimationFrame = this.lastFrame;
        }
    }
}