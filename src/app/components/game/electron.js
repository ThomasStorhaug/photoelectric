import { Actor, CollisionType, ImageSource } from "excalibur";
import { photonCollisionGroup } from "./photon";


const electronImage = new ImageSource('http://localhost:3000/resources/electron.png')
electronImage.load()


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

    onInitialize() {
        if (electronImage.isLoaded()) {
            this.graphics.use(electronImage.toSprite());
        }
    }

    onPostUpdate() {
        if (Math.abs(this.vel.x) > this.maxVel) {
            this.acc.x = 0;
        }
    }
}