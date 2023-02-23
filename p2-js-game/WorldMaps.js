class WorldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
    }

    asGridCoords(x,y) {
        let wallX = x*16;
        let wallY = y*16;   
        for (let countX = wallX; countX < wallX+16; countX++) {
            this.walls[`${countX}, ${wallY}`] = true;

            // if (countX == wallX+15){
            //     for (let countY = wallX+16; countY > wallY-16; countY--) {
            //         this.walls[`${countX}, ${countY}`] = true;
            //     }
            // }
        }

        // for (let countX = wallX; countX > wallX-16; countX--) {
        //     this.walls[`${countX}, ${wallY}`] = true;
        // }
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
        // walls: {
        //     // [utils.asGridCoords(0,1)] : true,
        // }
    }
}