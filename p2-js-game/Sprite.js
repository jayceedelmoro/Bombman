class Sprite {
    constructor(config) {

        //Setup the Image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        //Shadow
        this.shadow = new Image();
        this.useShadow = config.useShadow;
        if (this.useShadow) {
            this.shadow.src = 'assets/character/people/DemoRpgCharacterShadow.png';
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        this.isNotMovable = config.isNotMovable;

        // Config Animation and Initial State
        this.animations = config.animations || {
            'walk-up': [ [0,2],[1,2],[0,2],[3,2] ],
            'walk-down': [ [0,0],[1,0],[0,0],[3,0] ],
            'walk-left': [ [0,3],[1,3],[0,3],[3,3] ],
            'walk-right': [ [0,1],[1,1],[0,1],[3,1] ]
        }

        this.currentAnimation = config.currentAnimation || 'walk-down';
        this.currentAnimationFrame = 0;

        //How fast the frame changes into the next one
        this.animationFrameSpeed = config.animationFrameSpeed || 6;
        this.animationFrameProgress = config.animationFrameProgress;

        //Reference Game Object
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    //Changes the animation and character facing
    changeAnimation(directionKey) {
        if(this.currentAnimation !== directionKey){
            this.currentAnimation = directionKey;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameSpeed;
        }
    }

    //Cycle through animation frames
    updateAnimation() {
        if(this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        this.animationFrameProgress = this.animationFrameSpeed;
        this.currentAnimationFrame +=1;

        //Goes to the first animation frames
        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    //Draws Objects on canvas
    draw (ctx) {
        const locationX = this.gameObject.locationX;
        const locationY = this.gameObject.locationY;

        //Specify which frame coordinates to show
        let [frameX, frameY] = this.frame;
        let cutSizeX, cutSizeY, sizeX, sizeY = 0;

        if (!this.isNotMovable) {
            frameX = frameX * 32 + 8;
            frameY = frameY * 32 + 14;
            cutSizeX = 14;
            cutSizeY = 16;
            sizeX = cutSizeX;
            sizeY = cutSizeY;
        } 
        else {
            frameX = 0;
            frameY = 0;
            cutSizeX = 32;
            cutSizeY = 32;
            sizeX = 16;
            sizeY = 16;
        }

        this.isShadowLoaded && ctx.drawImage(
            this.shadow,
            locationX - 8, locationY - 14
        );
        
        this.isLoaded && ctx.drawImage(
                this.image, //img src
                frameX, frameY, //starting point of the cut in the image
                cutSizeX, cutSizeY, // size of the cut
                locationX, locationY, //location on the canvas
                sizeX, sizeY  //how big is the image
        )

        this.updateAnimation();
    }
}

class Bomb {
    constructor(config){
        
        this.bomb = new Image();
        this.bomb.src = config.src;
        this.bomb.onload = () => {
            this.isBombLoaded = true;
        }
        
        this.gameObject = config.gameObject;
    }

    bombPosition(ctx) {
        const bombLocationX = this.gameObject.locationX;
        const bombLocationY = this.gameObject.locationY;
        
        this.isBombLoaded && ctx.drawImage(
            this.bomb, //img src
            2, 109, //starting point of the cut in the image
            18, 18, // size of the cut
            bombLocationX, bombLocationY, //location on the canvas
            15, 15  //how big is the image
        )
    }
}

class Door {
    constructor(config){
        
        this.door = new Image();
        this.door.src = config.src;
        this.door.onload = () => {
            this.isDoorLoaded = true;
        }
        
        this.gameObject = config.gameObject;
    }

    doorPosition(ctx) {
        const locationX = this.gameObject.locationX;
        const locationY = this.gameObject.locationY;
        
        this.isDoorLoaded && ctx.drawImage(
            this.door, //img src
            91, 319, //starting point of the cut in the image
            22, 19, // size of the cut
            locationX, locationY, //location on the canvas
            17, 15  //how big is the image
        )
    }
}