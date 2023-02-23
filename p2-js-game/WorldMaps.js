class WorldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x}, ${y}`] || false;
    }
}

window.worldMaps = {
    Demo: {
        gameObjects: {
            hero: new Person({
                mainCharacter: true,
                locationX: utils.grid(0),
                locationY: utils.grid(0),
            }),
            sub: new Person({
                npc: true,
                locationX: utils.grid(0),
                locationY: utils.grid(1),
            })
        },
        walls: {
            [utils.asGridCoords(0,1)] : true,
        }
    }
}