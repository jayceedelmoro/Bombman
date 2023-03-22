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
        this.door = new Door({
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
        this.bombRange = 2;
        this.bombExpolosionRange = (16 * this.bombRange) + 8;

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
        else if (this.mainCharacter && (Math.abs(this.locationX - state.map.doorCoordinates[0]) <= 8 && (this.locationY - state.map.doorCoordinates[1] >= -8 && this.locationY - state.map.doorCoordinates[1] <= 1))) {
            state.continue.stop();
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
        let nearBreakableWall = [];

        if (this.existingBomb < this.bombCount) {
            //checks if the bomb is already placed in main character's current position
            if (!this.existingBombArray.includes(`${this.locationX}, ${this.locationY}`)) {
                this.existingBombArray.push(`${this.locationX}, ${this.locationY}`);

                //check the index of the placed bomb that will be used as an identifier
                bombIndex = this.existingBombArray.indexOf(`${this.locationX}, ${this.locationY}`)

                //coordinates of the placed bomb
                currentBombLocation = this.existingBombArray[bombIndex].split(',');

                //add bomb object
                state.map.gameObjects[`bomb${bombIndex}`] = new BombBlock({
                    locationX: this.locationX,
                    locationY: this.locationY,
                });

                //increase number of bombs placed
                this.existingBomb +=1;

                //this will make the bomb disapear
                setTimeout(() => {

                    //remove the bomb object
                    delete state.map.gameObjects[`bomb${bombIndex}`];
                    this.existingBomb -=1;
                    
                    //remove the bomb on the bomb array
                    this.existingBombArray.splice(bombIndex, 1)
                    
                    //search the walls that will be destroyed
                    nearBreakableWall = state.map.breakableWallsPosition.filter((position) => {
                        return (Math.abs(position[0] - (parseInt(currentBombLocation[0]))) <= this.bombExpolosionRange && Math.abs(position[1] - (parseInt(currentBombLocation[1]))) <= 1
                        || (Math.abs(position[0] - (parseInt(currentBombLocation[0]))) <= 2 && Math.abs(position[1] - (parseInt(currentBombLocation[1]))) <= this.bombExpolosionRange));
                    })
                    
                    for (let outerCount = 0; outerCount < nearBreakableWall.length; outerCount++) {
                        
                        
                        //search for the identifier(coordinates) of the walls that will be destroyed
                        for (let innerCount = 0; innerCount < state.map.breakableWallsPosition.length; innerCount++) {
                            if (state.map.breakableWallsPosition[innerCount].toString() == nearBreakableWall[outerCount].toString()) {

                                //remove breakable walls
                                delete state.map.gameObjects[`wall ${nearBreakableWall[outerCount].toString()}`];
                                state.map.breakableWallsPosition.splice(innerCount, 1);
                            }
                        }

                        
                        //check the index of the destroyed wall from the list of walls
                        for (let innerCount = 0; innerCount < state.map.walls.length; innerCount++) {
                            if (state.map.walls[innerCount].toString() == nearBreakableWall[outerCount].toString()) {

                                //remove destroyed walls from the list of walls
                                state.map.walls.splice(innerCount, 1);
                            }
                        }
                    }

                    //clear list of brekable walls that are near the bomb
                    for (let index = 0; index < nearBreakableWall.length; index++) {
                        nearBreakableWall.splice(index, 1);
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

class DoorBlock extends GameObjects {
    constructor(config) {
        super(config);
    }
}