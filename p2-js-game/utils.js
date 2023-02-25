const utils = {
    grid(n) {
        return n * 16;
    },

    drawWholeMap(ctx, image, width, height) {
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
            'KeyD': 'right'
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