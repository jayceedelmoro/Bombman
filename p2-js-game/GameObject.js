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

    update() {

    }
}

class Person extends GameObjects {
    constructor(config) {
        super(config);

        this.mainCharacter = config.mainCharacter || false;

        this.directionMovement = {
            'up': ['locationY', -1],
            'down': ['locationY', 1],
            'left': ['locationX', -1],
            'right': ['locationX', 1]
        }
    }

    update(state) {
        this.updatePosition();

        if (this.mainCharacter && state.arrow) {
            this.direction = state.arrow;
        } else {
            this.direction = null;
        }
    }

    updatePosition() {
        if(this.direction !== null) {
            const [property, change] = this.directionMovement[this.direction];
            this[property] += change;
        }
    }
}