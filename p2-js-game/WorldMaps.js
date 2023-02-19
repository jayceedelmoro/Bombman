class WorldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
    }
}

window.worldMaps = {
    Demo: {
        gameObjects: {
            hero: new Person({
                    locationX: utils.grid(0),
                    locationY: utils.grid(0),
                })
        }
    }
}