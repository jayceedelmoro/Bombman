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
        this.useShadow = true;
        if (this.useShadow) {
            this.shadow.src = 'assets/character/people/DemoRpgCharacterShadow.png';
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

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
        const [frameX, frameY] = this.frame;

        this.isShadowLoaded && ctx.drawImage(
            this.shadow,
            locationX - 8, locationY - 14
        );
        
        this.isLoaded && ctx.drawImage(
                this.image, //img src
                (frameX * 32)+8, (frameY * 32)+14, //starting point of the cut in the image
                14, 16, // size of the cut
                locationX, locationY, //location on the canvas
                14, 16  //how big is the image
        )

        this.updateAnimation();
    }
}