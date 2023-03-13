const utils = {
    grid(n) {
        return n * 16;
    },

    randomPosition(availableMapSlots) {
        let position = Math.floor(Math.random()*availableMapSlots.length);
        return position;
    },
    
    addObject(map) {
        
        let position = Math.floor(Math.random()*map.availableMapSlots.length);
        let doorPosition = Math.floor(Math.random()*map.totalMapSlots.length);

        //Add door
        map.gameObjects['door'] = new Person({
            isNotMovable: true,
            locationX: map.availableMapSlots[doorPosition][0],
            locationY: map.availableMapSlots[doorPosition][1],
        });
        
        //Add Breakable Blocks
        for (number = 1; number <= 20; number++) {
            
        position = Math.floor(Math.random()*map.availableMapSlots.length);

            map.gameObjects[`wall ${[map.availableMapSlots[position][0], map.availableMapSlots[position][1]].toString()}`] = new BreakableBlocks({
                isNotMovable: true,
                locationX: map.availableMapSlots[position][0],
                locationY: map.availableMapSlots[position][1],
                src: 'assets/maps/Brick.png',
            });

            map.addWall(map.availableMapSlots[position][0], map.availableMapSlots[position][1], true)
        }

        //Add Hero
        map.gameObjects['hero'] = new Person({
            mainCharacter: true,
            useShadow: true,
            locationX: map.availableMapSlots[position][0],
            locationY: map.availableMapSlots[position][1],
        });
        
        // Add Monsters
        // for (number = 1; number <= 3; number++) {
            
        // position = Math.floor(Math.random()*map.availableMapSlots.length);

        //     map.gameObjects[`monster ${[map.availableMapSlots[position][0], map.availableMapSlots[position][1]].toString()}`] = new Monsters({
        //         npc: true,
        //         useShadow: true,
        //         locationX: map.availableMapSlots[position][0],
        //         locationY: map.availableMapSlots[position][1],
        //         src: 'assets/character/people/DemoRpgCharacter.png',
        //     });
        // }

        // Add Bomb
        // map.gameObjects['bomb'] = new GameObjects({
        //     bombLocationX: 0,
        //     bombLocationY: 16,
        // });
        
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