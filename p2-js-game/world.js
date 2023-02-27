class World {
    constructor(config) {
        this.element = config.element;
        this.canvas = document.querySelector('.game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.map = null;
    }

    startGameRefresh() {
        const step = () => {
            // Clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Draw Map
            this.map.drawMap(this.ctx, this.canvas);

            // Draw Objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.pressedDirection,
                    map: this.map,
                });
                object.sprite.draw(this.ctx);
            })

            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init() {
        this.map = new WorldMap(window.worldMaps.Demo);


        this.directionInput = new Directions();
        this.directionInput.init();

        this.startGameRefresh();

        //Draw Permanent Walls
        this.map.permaWalls();

        //Random Hero Starting Position
        let newHeroLocation = utils.randomPosition(this.map.mapSlots);
        this.map.gameObjects.hero.locationX = this.map.mapSlots[newHeroLocation][0];
        this.map.gameObjects.hero.locationY = this.map.mapSlots[newHeroLocation][1];
        console.log(this.map.mapSlots);

    }
}
