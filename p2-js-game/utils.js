const utils = {
    grid(n) {
        return n * 16;
    },

    boundary(canvas) {
        let canvasHeight = canvas.height;
        let canvasWidth = canvas.width;
        
        return {canvasHeight,canvasWidth};
    }
    // asGridCoords(x,y) {
    //     // this.map = new WorldMap(walls);
    //     // return this.walls[`${x}, ${y}`] = true;
    //         return `${x*16}, ${y*16}`;
    // },
    // nextPosition(initialX, initialY, direction) {
    //     let x = initialX;
    //     let y = initialY;
    //     const size = 16;

    //     if (direction === 'up') {
    //         y -= size;
    //     } else if (direction === 'down') {
    //         y += size;
    //     } else if (direction === 'left') {
    //         x -= size;
    //     } else if (direction === 'right') {
    //         x += size;
    //     }
        
    //     return {x,y};
    // }
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