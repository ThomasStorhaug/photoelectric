const { Actor } = require("excalibur");

export class StaticActor extends Actor {
    constructor({ imageSource, x, y }) {
        super({
            x: x,
            y: y
        });
        this.imageSource = imageSource;
    }

    onInitialize(engine) {
        // Convert the ImageSource to a sprite and apply it
        this.graphics.use(this.imageSource.toSprite());
    }
}
