'use client'
import { Color, Engine, Timer, vec } from 'excalibur';
import { useEffect, useRef } from 'react';

import { wavelengthToRGB } from './game/convertColor';
import { CustomLoader } from './game/customLoader';
import { Electron } from './game/electron';
import { Photon } from './game/photon';
import { Scene1 } from './game/scene1';

const PhysicsSimulation = ({ bgColor, intensity, wavelength, electronVel, electronAcceleration, electronMaxVel, showAllElectrons, spawnProbability }) => {
    const gameContainerRef = useRef(null)
    const engineRef = useRef(null);
    const timerRef = useRef(null);
    const sceneRef = useRef(null)

    useEffect(() => {
        const colors = {
            'dark': [28, 25, 23],
            'light': [255, 255, 255]
        }
        const interval = intensity / 1500
        // Create a new Excalibur Engine if it doesn't exist
        if (!engineRef.current) {
            const backgroundColor = new Color(colors[bgColor][0], colors[bgColor][1], colors[bgColor][2], 1)
            const engine = new Engine({
                width: 800,
                height: 600,
                backgroundColor: backgroundColor,
            });

            const scene1 = new Scene1(engine)
            engine.add('scene1', scene1)

            sceneRef.current = scene1;

            const spawnElectron = (x, y, velocity) => {
                const maxVelValue = engineRef.current.electronMaxVel / 526;
                const electron = new Electron({
                    x: x,
                    y: y,
                    radius: 8,
                    maxVel: maxVelValue
                })
                electron.body.vel = velocity
                if (engineRef.current.electronAcceleration) {
                    electron.body.acc = vec(engineRef.current.electronAcceleration / 70000000, 0)
                }
                electron.addTag('electron')
                electron.on('collisionstart', () => {
                    electron.kill();
                });

                engine.add(electron);
            }

            const handleSpawnElectron = (x, y) => {
                const willSpawnMaxEnergy = Math.random() * 100;
                const velocityXValue = engineRef.current.electronVel / 526;
                if (engineRef.current.electronVel > 0) {
                    if (willSpawnMaxEnergy <= engineRef.current.spawnProbability) {
                        spawnElectron(x, y, vec(velocityXValue, 0));
                    } else if (Math.random() * 100 > 70 && engineRef.current.showAllElectrons) {
                        spawnElectron(x, y, vec(velocityXValue - Math.random() * 200, 0))
                    }
                }
            }

            const spawnPhotons = () => {
                const currentWavelength = engineRef.current.wavelength || 400;
                const [r, g, b] = wavelengthToRGB(currentWavelength);

                const x_coord = Math.random() * 61 + 278;
                const y_coord = x_coord + -217
                const photon = new Photon({
                    x: x_coord,
                    y: y_coord,
                    radius: 4,
                    color: Color.fromRGB(r, g, b, 1)
                })

                photon.body.vel = vec(-400, 400)
                photon.on('collisionstart', () => {
                    const pos = photon.pos;
                    handleSpawnElectron(pos.x + 10, pos.y);
                    photon.kill();
                })

                engine.add(photon)
            }

            const photonSpawnTimer = new Timer({
                interval: interval,
                repeats: true,
                fcn: spawnPhotons
            })



            scene1.add(photonSpawnTimer);
            photonSpawnTimer.start();

            timerRef.current = photonSpawnTimer;

            // Create a loader for Scene1's resources
            const loader = new CustomLoader(scene1.getResources());

            // Start the engine with the loader (loads images first)
            engine.start(loader).then(() => {
                // Once loaded, go to Scene1
                engine.goToScene('scene1');
            });

            // Store references for later updates
            engineRef.current = engine;

            // Attach the Excalibur canvas to the specified container
            gameContainerRef.current.appendChild(engine.canvas);
        }

        // Cleanup the engine when the component is unmounted
        return () => {
            if (engineRef.current) {
                engineRef.current.stop();
            }
        };
    }, [intensity, bgColor]);

    useEffect(() => {
        const colors = {
            'dark': [28, 25, 23],
            'light': [255, 255, 255]
        }
        if (engineRef.current && timerRef.current) {
            const newInterval = 1500 / intensity;
            timerRef.current.interval = newInterval;
            timerRef.current.reset();
            timerRef.current.start();

            engineRef.current.intensity = intensity
            engineRef.current.backgroundColor = new Color(colors[bgColor][0], colors[bgColor][1], colors[bgColor][2], 1);
            engineRef.current.wavelength = wavelength;
            engineRef.current.electronVel = electronVel;
            engineRef.current.showAllElectrons = showAllElectrons;
            engineRef.current.spawnProbability = spawnProbability;
            engineRef.current.electronMaxVel = electronMaxVel;
            engineRef.current.electronAcceleration = electronAcceleration;
        }
    }, [bgColor, intensity, wavelength, electronVel, showAllElectrons, spawnProbability, electronMaxVel, electronAcceleration])

    useEffect(() => {
        if (sceneRef.current) {
            const accValue = electronAcceleration / 70000000;

            // Get the current active scene and all its actors
            const currentScene = sceneRef.current;

            for (let actr of currentScene.actors) {
                if (actr.tags.has('electron'))
                    actr.acc.x = accValue;
            }

        }
    }, [electronAcceleration]);


    return (
        <div>
            <div ref={gameContainerRef} className='m-2 border-1'>
            </div>
        </div>
    );
};

export default PhysicsSimulation;
