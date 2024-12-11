import { Actor, CollisionType, ImageSource } from "excalibur";
import { photonCollisionGroup } from "./photon";


const electronImage = new ImageSource('/resources/electron.png')


export class Electron extends Actor {
    constructor({ x, y, radius, maxVel }) {
        super({
            x: x,
            y: y,
            radius,
            collisionType: CollisionType.Active, // Active collision
            collisionGroup: photonCollisionGroup,
        });
        this.maxVel = maxVel;
    }

    async onInitialize() {
        await electronImage.load(); // Ensure the image is loaded here
        this.graphics.use(electronImage.toSprite());
    }

    onPostUpdate() {
        if (Math.abs(this.vel.x) > this.maxVel) {
            this.acc.x = 0;
        }
    }
}