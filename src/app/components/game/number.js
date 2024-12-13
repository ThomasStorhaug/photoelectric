import { Actor, ImageSource } from "excalibur";


export default class Number extends Actor {
    constructor({ x, y, number }) {
        super({
            x: x,
            y: y
        });
        this.image = new ImageSource(`/resources/psu_${number}.png`)
    }

    async onInitialize() {
        this.image.load();
        this.graphics.use(this.image.toSprite());
    }
}