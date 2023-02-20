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
            'idle-up': [ [0,2] ],
            'idle-down': [ [0,0] ],
            'idle-left': [ [0,3] ],
            'idle-right': [ [0,1] ],
            'walk-up': [ [0,2],[1,2],[0,2],[3,2] ],
            'walk-down': [ [0,0],[1,0],[0,0],[3,0] ],
            'walk-left': [ [0,3],[1,3],[0,3],[3,3] ],
            'walk-right': [ [0,1],[1,1],[0,1],[3,1] ]
        }
        this.currentAnimation = config.currentAnimation || 'walk-down';
        this.currentAnimationFrame = 0;

        this.animationFrameSpeed = config.animationFrameSpeed || 4;
        this.animationFrameProgress = config.animationFrameProgress;

        //Reference Game Object
        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    changeAnimation(directionKey) {
        if(this.currentAnimation !== directionKey){
            this.currentAnimation = directionKey;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameSpeed;
        }
    }

    updateAnimation() {
        if(this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        this.animationFrameProgress = this.animationFrameSpeed;
        this.currentAnimationFrame +=1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw (ctx) {
        const locationX = this.gameObject.locationX - 5;
        const locationY = this.gameObject.locationY - 8;

        const [frameX, frameY] = this.frame;

        this.isShadowLoaded && ctx.drawImage(
            this.shadow,
            locationX, locationY
        );
        
        this.isLoaded && ctx.drawImage(
                this.image,
                frameX * 32, frameY * 32,
                32, 32,
                locationX, locationY,
                32, 32
        )

        this.updateAnimation();
    }
}