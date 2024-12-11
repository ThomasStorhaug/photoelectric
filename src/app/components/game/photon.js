import { Actor, CollisionGroupManager, CollisionType } from "excalibur";

export const photonCollisionGroup = CollisionGroupManager.create('photon')

export class Photon extends Actor {
    constructor({ x, y, radius, color }) {
        super({
            x: x,
            y: y,
            radius: radius,
            color: color,
            collisionType: CollisionType.Active,
            collisionGroup: photonCollisionGroup
        })
    }
}