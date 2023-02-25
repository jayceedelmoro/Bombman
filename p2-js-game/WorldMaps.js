class WorldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.canvas = document.querySelector('.game-canvas');
        this.walls = config.walls || new Array;
        this.canvasWidth = config.canvasWidth;
        this.canvasHeight = config.canvasHeight;

        this.mapImage = new Image();
        this.mapImage.src = config.mapSrc;
    }

    drawMap(ctx, canvas) {
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;

        ctx.drawImage(this.mapImage, 0, 0, this.canvasWidth*12, this.canvasHeight*12, 0, 0, 352, 198);
    }

    asGridCoords(x,y) {
        let wallX = x*16;
        let wallY = y*16;   
            this.walls.push([wallX, wallY]);
            // return this.walls[`${wallX}, ${wallY}`];
    }

    isSpaceTaken(currentX, currentY, direction) {
        // const {x,y, wallOccurence} = utils.nextPosition(currentX, currentY, direction);
        // return this.walls[`${x}, ${y}`] || false;

        let isWall;

        if(direction === 'up' ) {
            for(let countX = 0; countX < this.walls.length; countX++){
                if(currentY-1 >= this.walls[countX][1]-16 &&
                    currentY <= this.walls[countX][1]+16 &&
                    currentX-1 >= this.walls[countX][0]-16 &&
                    currentX+1 <= this.walls[countX][0]+16 ||
                    currentY < 0) {
                    isWall = true;
                }
            }
        } else if(direction === 'down') {
            for(let countX = 0; countX < this.walls.length; countX++){
                if(currentY >= this.walls[countX][1]-16 &&
                    currentY+1 <= this.walls[countX][1]+16 &&
                    currentX-1 >= this.walls[countX][0]-16 &&
                    currentX+1 <= this.walls[countX][0]+16 ||
                    currentY > this.canvasHeight - 26) {
                    isWall = true;
                }
            }
        } else if(direction === 'left') {
            for(let countX = 0; countX < this.walls.length; countX++){
                if(currentY-1 >= this.walls[countX][1]-16 &&
                    currentY+1 <= this.walls[countX][1]+16 &&
                    currentX-1 >= this.walls[countX][0]-16 &&
                    currentX <= this.walls[countX][0]+16 ||
                    currentX < 0) {
                    isWall = true;
                }
            }
        } else if(direction === 'right') {
            for(let countX = 0; countX < this.walls.length; countX++){
                if(currentY-1 >= this.walls[countX][1]-16 &&
                    currentY+1 <= this.walls[countX][1]+16 &&
                    currentX >= this.walls[countX][0]-16 &&
                    currentX+1 <= this.walls[countX][0]+16 ||
                    currentX > this.canvasWidth-20) {
                    isWall = true;
                }
            }
        }
        return isWall;
    }
}

window.worldMaps = {
    Demo: {
        mapSrc: 'assets/maps/map.png',
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
        
    }
}