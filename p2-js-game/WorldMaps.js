class WorldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.canvas = document.querySelector('.game-canvas');
        this.canvasWidth = config.canvasWidth;
        this.canvasHeight = config.canvasHeight;
        this.mapSlots = config.mapSlots || [];
        this.walls = [];

        this.mapImage = new Image();
        this.mapImage.src = config.mapSrc;

        this.breakableWalls = new Image();
        this.breakableWalls.src = config.breakableWallsSrc;
    }

    drawMap(ctx, canvas) {
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        utils.drawWholeMap(ctx, this.canvasWidth, this.canvasHeight, this.mapImage);
        

        for (let countX = 0; countX < this.canvasWidth; countX += 16) {
            for (let countY = 0; countY < this.canvasHeight; countY += 16) {
                this.mapSlots.push([countX, countY]);
            }
        }

    };

    permaWalls() {

        for (let countX = 0; countX < this.canvasWidth; countX += 32) {
            for (let countY = 0; countY < this.canvasHeight; countY += 32) {
                this.addWall(countX, countY)
            }
        }

        // for (let index = 0; index < this.mapSlots.length; index++) {
        //     for (let indexTwo = 0; indexTwo < this.walls.length; indexTwo++) {
        //         if (JSON.stringify(this.mapSlots[index]) == JSON.stringify(this.walls[indexTwo])) {
        //             this.mapSlots.splice(index, 1);
        //         }
        //     } 
        // }
    }

    addWall(wallX, wallY) {
        this.walls.push([wallX, wallY]);

        for (let index = 0; index < this.mapSlots.length; index++) {
            for (let indexTwo = 0; indexTwo < this.walls.length; indexTwo++) {
                if (JSON.stringify(this.mapSlots[index]) == JSON.stringify(this.walls[indexTwo])) {
                    this.mapSlots.splice(index, 1);
                }
            } 
        }
    }

    isSpaceTaken(currentX, currentY, direction) {

        let isWall;

        if(direction === 'up' ) {
            for(let countX = 0; countX < this.walls.length; countX++){
                if(currentY-1 >= this.walls[countX][1] - 16 &&
                    currentY <= this.walls[countX][1] + 16 &&
                    currentX-1 >= this.walls[countX][0] - 14 &&
                    currentX+1 <= this.walls[countX][0] + 14 ||
                    currentY < 0) {
                    isWall = true;
                }
            }
        } else if(direction === 'down') {
            for(let countX = 0; countX < this.walls.length; countX++){
                if(currentY >= this.walls[countX][1] - 16 &&
                    currentY+1 <= this.walls[countX][1] + 16 &&
                    currentX-1 >= this.walls[countX][0] - 14 &&
                    currentX+1 <= this.walls[countX][0] + 14 ||
                    currentY > this.canvasHeight - 26) {
                    isWall = true;
                }
            }
        } else if(direction === 'left') {
            for(let countX = 0; countX < this.walls.length; countX++){
                if(currentY-1 >= this.walls[countX][1] - 16 &&
                    currentY+1 <= this.walls[countX][1] + 16 &&
                    currentX-1 >= this.walls[countX][0] - 14 &&
                    currentX <= this.walls[countX][0] + 14 ||
                    currentX < 0) {
                    isWall = true;
                }
            }
        } else if(direction === 'right') {
            for(let countX = 0; countX < this.walls.length; countX++){
                if(currentY-1 >= this.walls[countX][1] - 16 &&
                    currentY+1 <= this.walls[countX][1] + 16 &&
                    currentX >= this.walls[countX][0] - 14 &&
                    currentX+1 <= this.walls[countX][0] + 14 ||
                    currentX > this.canvasWidth - 20) {
                    isWall = true;
                }
            }
        }
        return isWall;
    }
}

window.worldMaps = {
    Demo: {
        mapSrc: 'assets/maps/Blocks.png',
        breakableWallsSrc: 'assets/maps/Blocks.png',
        gameObjects: {
            hero: new Person({
                mainCharacter: true,
            }),
            // sub: new Person({
            //     npc: true,
            //     locationX: utils.grid(0),
            //     locationY: utils.grid(1),
            // })
        },
        
    }
}