class World {
    constructor(config) {
        this.element = config.element;
        this.canvas = document.querySelector('.game-canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    init() {

        const hero = new GameObjects({
            locationX: utils.grid(0),
            locationY: utils.grid(0),
        });

        setTimeout(() => {
        hero.sprite.draw(this.ctx);
        shadow.sprite.draw(this.ctx);
        }, 200);


    }
}