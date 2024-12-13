const planck_eV = 4.135e-15; // eV/Hz
const planck = 6.626e-34 // kg m^2 / s
const electronVolt = 1.602e-19 // J/eV

function calcPhotonEnergy(_photonFrequency) {
    return (planck * _photonFrequency)
}

export function generateEnergyFrequencyData(photonFrequency, workFunction,) {
    // Ke = Ef - phi
    const cutOffFrequency = workFunction / planck;
    let data;
    if (photonFrequency > cutOffFrequency) {
        data = [
            {
                x: cutOffFrequency / 1e15,
                'energy eV': ((calcPhotonEnergy(cutOffFrequency)) - workFunction) / electronVolt
            },
            {
                x: photonFrequency / 1e15,
                'energy eV': (calcPhotonEnergy(photonFrequency) - workFunction) / electronVolt
            },
            {
                x: 3,
                'energy eV': (calcPhotonEnergy(3e15) - workFunction) / electronVolt
            }
        ]
    } else {
        data = [
            {
                x: cutOffFrequency / 1e15,
                'energy eV': ((calcPhotonEnergy(cutOffFrequency)) - workFunction) / electronVolt
            },
            {
                x: 3,
                'energy eV': (calcPhotonEnergy(3e15) - workFunction) / electronVolt
            }
        ]
    }

    return data
}