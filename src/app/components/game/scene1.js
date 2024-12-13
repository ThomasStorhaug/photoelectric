'use client'

import { Actor, ImageSource, Scene } from 'excalibur';
import { StaticActor } from './static_actor';

const BASE_URL = '/resources/'; // Assuming public/resources directory in Next.js

export class Scene1 extends Scene {
    constructor() {
        super();
        // Initialize image sources
        this.chamberImage = new ImageSource(BASE_URL + 'chamber.png');
        this.anodeImage = new ImageSource(BASE_URL + 'anode.png');
        this.cathodeImage = new ImageSource(BASE_URL + 'cathode.png');
        this.metalPlateImage = new ImageSource(BASE_URL + 'metal_plate.png');
        this.psuImage = new ImageSource(BASE_URL + 'psu.png');
        //this.multimeterImage = new ImageSource(BASE_URL + 'multimeter.png');
        this.lightSourceImage = new ImageSource(BASE_URL + 'light_source.png');
        this.wiresPlusImage = new ImageSource(BASE_URL + 'wire_plus.png');
        this.wiresMinusImage = new ImageSource(BASE_URL + 'wire_minus.png');
    }

    // Return an array of all resources to load
    getResources() {

        return [
            this.chamberImage,
            this.anodeImage,
            this.cathodeImage,
            this.metalPlateImage,
            this.psuImage,
            //this.multimeterImage,
            this.lightSourceImage,
            this.wiresPlusImage,
            this.wiresMinusImage
        ];
    }

    onInitialize(engine) {

        // Create a basic actor (hitbox)
        const anode_hitbox = new Actor({
            x: 140,
            y: 260,
            height: 201,
            width: 10,
        });

        const cathode_hitbox = new Actor({
            x: 688,
            y: 260,
            height: 201,
            width: 44,
        })

        // Create a StaticActor using the already loaded ImageSource
        const chamberActor = new StaticActor({ imageSource: this.chamberImage, x: 400, y: 260 });
        const anodeActor = new StaticActor({ imageSource: this.anodeImage, x: 108, y: 260 });
        const metalPlateActor = new StaticActor({ imageSource: this.metalPlateImage, x: 140, y: 260 });
        const cathodeActor = new StaticActor({ imageSource: this.cathodeImage, x: 688, y: 260 });
        const psuActor = new StaticActor({ imageSource: this.psuImage, x: 400, y: 460 });
        //const multimeterActor = new StaticActor({ imageSource: this.multimeterImage, x: 543, y: 495 });
        const lightSourceActor = new StaticActor({ imageSource: this.lightSourceImage, x: 336, y: 65 })
        const wires = new StaticActor({ imageSource: this.wiresPlusImage, x: 394, y: 423 })

        // Add actors to the scene
        this.add(anode_hitbox);
        this.add(cathode_hitbox);
        this.add(chamberActor);
        this.add(anodeActor);
        this.add(metalPlateActor);
        this.add(cathodeActor);
        this.add(psuActor);
        //this.add(multimeterActor);
        this.add(lightSourceActor);
        this.add(wires)

    }
}
