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
            idleDown: [
                [0,0]
            ]
        }
        this.currentAnimation = config.currentAnimation || 'idleDown';
        this.currentAnimationFrame = 0;
        this.gameObject = config.gameObject;
    }


    draw (ctx) {
        const locationX = this.gameObject.locationX;
        const locationY = this.gameObject.locationY;

        this.isShadowLoaded && ctx.drawImage(
            this.shadow,
            locationX, locationY
        );
        
        this.isLoaded && ctx.drawImage(
                this.image,
                0, 0,
                32, 32,
                locationX, locationY,
                32, 32
        )
    }
}