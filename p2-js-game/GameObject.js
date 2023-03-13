class GameObjects {
    constructor(config) {
        this.canvas = document.querySelector('.game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.locationX = config.locationX || 0;
        this.locationY = config.locationY || 0;
        this.direction = config.directionMain || 'down';
        this.lastFrame = config.lastFrame;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || 'assets/character/people/DemoRpgCharacter.png',
            useShadow: config.useShadow || false,
            isNotMovable: config.isNotMovable || false,
        });
        this.bomb = new Bomb({
            gameObject: this,
            src: 'assets/character/people/bomber.png',
        });
    }

    update() {

    }
}

class Person extends GameObjects {
    constructor(config) {
        super(config);

        this.mainCharacter = config.mainCharacter || false;
        this.npc = config.npc || false;

        //Specify bombs
        this.bombCount = 2;
        this.existingBomb = 0;
        this.existingBombArray = [];

        //Specify the movement on the canvas
        this.directionMovement = {
            'up': ['locationY', -1],
            'down': ['locationY', 1],
            'left': ['locationX', -1],
            'right': ['locationX', 1],
            'bomb': null,
        }
    }

    update(state) {
        this.updateSpriteDirection(state);

        //Moves Main Character if a movement direction is pressed
        if (this.mainCharacter && state.arrow && state.arrow !== 'bomb') {
            this.direction = state.arrow;
            this.isThereWall = state.map.isSpaceTaken(this.locationX, this.locationY, this.direction);
            this.updateSpriteDirection(state);
            
            if(!this.isThereWall) {
                this.updatePosition();
            }


        }
        else if (this.mainCharacter && state.arrow && state.arrow === 'bomb') {
            this.placeBomb(state);
        }
        else {
            this.direction = null;
        }
    }

    //Update Character's Positions
    updatePosition() {
        if(this.direction !== null) {
            let [property, change] = this.directionMovement[this.direction];
            this[property] += change;
        }
        else {
            return;
        }
    }

    updateSpriteDirection(state) {
        //Adds animation and specify the direction the character is facing
        if(this.direction != null) {
            this.sprite.changeAnimation(`walk-${this.direction}`);
            this.lastFrame = this.sprite.currentAnimationFrame;
        }
        
        //Pause at the last frame when the character stops moving
        else {
            this.sprite.currentAnimationFrame = this.lastFrame;
        }
    }

    placeBomb(state) {
        let bombIndex = 0;
        let currentBombLocation = [];
        let breakableWallIndex = 0;
        let wallIndex = 0;
        // this.existingBombArray.some(function(ele){
        //     console.log(JSON.stringify(ele) == JSON.stringify([this.locationX, this.locationY]));
        //   });

        if (this.existingBomb < this.bombCount) {
            if (!this.existingBombArray.includes(`${this.locationX}, ${this.locationY}`)) {
                this.existingBombArray.push(`${this.locationX}, ${this.locationY}`);
                bombIndex = this.existingBombArray.indexOf(`${this.locationX}, ${this.locationY}`)
                currentBombLocation = this.existingBombArray[bombIndex].split(',');
                state.map.gameObjects[`bomb${bombIndex}`] = new BombBlock({
                    locationX: this.locationX,
                    locationY: this.locationY,
                });
                this.existingBomb +=1;
                console.log(state.map.walls);

                setTimeout(() => {
                    delete state.map.gameObjects[`bomb${bombIndex}`];
                    this.existingBomb -=1;
                    this.existingBombArray.splice(bombIndex, 1)
                    
                    breakableWallIndex = state.map.breakableWallsPosition.indexOf(`${parseInt(currentBombLocation[0]) + 16},${currentBombLocation[1]}`);
                    
                    for (let index = 0; index < state.map.walls.length; index++) {
                        if (state.map.walls[index].toString() == [parseInt(currentBombLocation[0]) + 16,parseInt(currentBombLocation[1])].toString()) {
                            wallIndex = index;
                        }
                    }

                    if (breakableWallIndex != -1) {
                        delete state.map.gameObjects[`wall${breakableWallIndex + 1}`];
                        console.log(`${parseInt(currentBombLocation[0]) + 16},${currentBombLocation[1]}`);
                        console.log([parseInt(currentBombLocation[0]) + 16, parseInt(currentBombLocation[1])]);
                        console.log(wallIndex);
                        console.log(JSON.stringify([parseInt(currentBombLocation[0]) + 16,parseInt(currentBombLocation[1])]));
                        console.log(state.map.walls.splice(wallIndex, 1));
                        console.log(state.map.walls);
                    }
                }, 2000);
            }
        }

    }
}

class Monsters extends Person{
    constructor(config) {
        super(config);
    }
    update(state) {

        //Randomize movement
        if (this.npc) {
            const randomDirection = Object.keys(this.directionMovement);
            this.direction = randomDirection[Math.floor(Math.random() * 4)];
            this.isThereWall = state.map.isSpaceTaken(this.locationX, this.locationY, this.direction);
            this.updateSpriteDirection(state);
            
            if(!this.isThereWall) {
                this.updatePosition();
            }
        }
    }
}

class BreakableBlocks extends Person{
    constructor(config) {
        super(config);
    }
}

class BombBlock extends GameObjects {
    constructor(config) {
        super(config);
    }
}