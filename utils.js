const utils = {
    grid(n) {
        return n * 16;
    },

    randomPosition(availableMapSlots) {
        let position = Math.floor(Math.random()*availableMapSlots.length);
        return position;
    },
    
    addObject(map) {
        
        let availableSlots = map.availableMapSlots;
        let position = this.randomPosition(availableSlots);
        let doorPosition = this.randomPosition(availableSlots);

        //Add door
        map.gameObjects['door'] = new DoorBlock({
            isNotMovable: true,
            locationX: availableSlots[doorPosition][0],
            locationY: availableSlots[doorPosition][1],
        });

        map.doorCoordinates.push(availableSlots[doorPosition][0]);
        map.doorCoordinates.push(availableSlots[doorPosition][1]);
        
        //Add Breakable Blocks
        for (number = 1; number <= 20; number++) {
            
        position = this.randomPosition(availableSlots);

            map.gameObjects[`wall ${[availableSlots[position][0], availableSlots[position][1]].toString()}`] = new BreakableBlocks({
                isNotMovable: true,
                locationX: availableSlots[position][0],
                locationY: availableSlots[position][1],
                src: 'assets/maps/Brick.png',
            });

            map.addWall(availableSlots[position][0], availableSlots[position][1], true)
        }

        //Add Hero
        map.gameObjects['hero'] = new Person({
            mainCharacter: true,
            useShadow: true,
            locationX: availableSlots[position][0],
            locationY: availableSlots[position][1],
        });
        
    },

    drawWholeMap(ctx, width, height, image) {
        for (let countX = 0; countX < width; countX += 32) {
            for (let countY = 0; countY < height; countY += 32) {
                ctx.drawImage(
                    image,
                    0, 0,
                    32, 32,
                    countX, countY,
                    16, 16
                );
            }
        }
    }
}

class Directions {
    constructor() {
        this.heldDirections = [];

        this.map = {
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
            'KeyW': 'up',
            'KeyS': 'down',
            'KeyA': 'left',
            'KeyD': 'right',
            'Space': 'bomb',
        }
    }

    get pressedDirection() {
        return this.heldDirections[0];
    }

    init() {
        document.addEventListener('keydown', keypressed => {
            const charDirection = this.map[keypressed.code];
            if(charDirection && this.heldDirections.indexOf(charDirection) === -1) {
                this.heldDirections.unshift(charDirection);
            }
        });
        
        document.addEventListener('keyup', keyreleased => {
            const charDirection = this.map[keyreleased.code];
            const index = this.heldDirections.indexOf(charDirection);
            if(index > -1) {
                this.heldDirections.splice(index, 1);
            }
        });
    }
}