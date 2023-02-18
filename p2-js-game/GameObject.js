class GameObjects {
    constructor(config) {
        this.locationX = config.locationX || 0;
        this.locationY = config.locationY || 0;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || 'assets/character/people/DemoRpgCharacter.png',
        });
    }
}

class Persone extends GameObjects {
    
}