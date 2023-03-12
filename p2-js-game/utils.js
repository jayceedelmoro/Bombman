const utils = {
    grid(n) {
        return n * 16;
    },

    randomPosition(mapSlots) {
        let position = Math.floor(Math.random()*mapSlots.length);
        return position;
    },
    
    addObject(map) {
        
        let position = Math.floor(Math.random()*map.mapSlots.length);
        
        //Add Breakable Blocks
        for (number = 1; number <= 100; number++) {

            position = Math.floor(Math.random()*map.mapSlots.length);

            map.gameObjects[`wall${number}`] = new BreakableBlocks({
                isNotMovable: true,
                locationX: map.mapSlots[position][0],
                locationY: map.mapSlots[position][1],
                src: 'assets/maps/Brick.png',
            });

            map.addWall(map.mapSlots[position][0], map.mapSlots[position][1])
        }

        //Add Hero
        map.gameObjects['hero'] = new Person({
            mainCharacter: true,
            useShadow: true,
            locationX: map.mapSlots[position][0],
            locationY: map.mapSlots[position][1],
        });
        
        // Add Monsters
        for (number = 1; number <= 3; number++) {

            position = Math.floor(Math.random()*map.mapSlots.length);

            map.gameObjects[`monster${number}`] = new Monsters({
                npc: true,
                useShadow: true,
                locationX: map.mapSlots[position][0],
                locationY: map.mapSlots[position][1],
                src: 'assets/character/people/DemoRpgCharacter.png',
            });
        }

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