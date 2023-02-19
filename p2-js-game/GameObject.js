class GameObjects {
    constructor(config) {
        this.locationX = config.locationX || 0;
        this.locationY = config.locationY || 0;
        this.direction = config.direction || 'down';
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || 'assets/character/people/DemoRpgCharacter.png',
        });
    }
}

class Person extends GameObjects {
    constructor(config) {
        super(config);
        this.remainingMovement = 16;

        this.directionMovement = {
            'up': ['locationY', -1],
            'down': ['locationY', 1],
            'left': ['locationX', -1],
            'right': ['locationX', 1]
        }
    }

    update(state) {
        this.updatePosition();
    }

    updatePosition() {
        if(this.remainingMovement > 0) {
            const [property, change] = this.directionMovement[this.direction];
            this[property] += change;
            this.remainingMovement -= 1;
        }
    }
}