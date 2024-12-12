'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'
import { AudioLines, AudioWaveform, ChevronDown, ChevronUp, CircleHelp, Gauge, Moon, Pencil, Save, Sun, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { WavelengthSlider } from './components/custom_slider'
import { generateEnergyFrequencyData } from './components/data_for_chart'
//import { PhysicsSimulation } from './components/game'; // for development, comment out in production
import { elements } from './components/metals'
import { Plot } from './components/plot'

// for production, comment out in development

import dynamic from 'next/dynamic'

PhysicsSimulation = dynamic(() => import('./components/game.js'), {
  ssr: false




export default function Home() {

  const [darkMode, setDarkMode] = useState(true);
  const { setTheme } = useTheme()

  // --== Simulation settings ==--
  // #region

  // Ef = Ke + phi
  // Ke = 1/2 m v^2
  // v = sqrt( 2*(Ef-phi)/m )
  const planck_eV = 4.135e-15; // eV/Hz
  const planck = 6.626e-34 // kg m^2 / s
  const lightSpeed = 299792458 // m/s
  const unitMass = 9.11e-31 // kg
  const electronVolt = 1.602e-19 // J/eV
  const distance = 1 // m
  const unitCharge = 1.602e-19 // Coulomb

  const maxPhotonFrequency = calcPhotonFrequency(100e-9);
  const minPhotonFrequency = calcPhotonFrequency(900e-9);

  const maxPhotonEnergy = calcPhotonEnergy(maxPhotonFrequency);
  const minPhotonEnergy = calcPhotonEnergy(minPhotonFrequency);

  // --== calculations ==--
  // #region

  function calcProbability(atomicNumber, _photonEnergy) {
  const specificEnergy = 100 * (_photonEnergy - minPhotonEnergy) / (maxPhotonEnergy - minPhotonEnergy);
  return 5 * atomicNumber / specificEnergy
}

  /**
 * 
 * @param {number} _wavelength must be in meter
 * @returns 
 */
  function calcPhotonFrequency(_wavelength) {
    return lightSpeed / _wavelength
  }

  function calcPhotonEnergy(_photonFrequency) {
    return (planck * _photonFrequency)
  }

  function calcElectronVel(_photonEnergy, _workFunction) {
    return Math.sqrt(2 * (_photonEnergy - _workFunction) / unitMass)
  }

  function calcAcceleration(voltage) {
    return unitCharge * voltage / (unitMass * distance)
  }

  function calcWavelength(_electronVel) {
    return planck * lightSpeed / (0.5 * unitMass * _electronVel ** 2 + workFunction)
  }

  function calcWavelengthFromFreq(_photonFrequency) {
    return lightSpeed / _photonFrequency
  }

  function calcMaxVel(voltage) {
    return Math.sqrt(2 * unitCharge / unitMass)
  }
  // #endregion

  // Default values
  const defaultPhotonWavelength = 380e-9 // m
const defaultPhotonFrequency = calcPhotonFrequency(defaultPhotonWavelength);
const defaultPhotonEnergy = calcPhotonEnergy(defaultPhotonFrequency);
const defaulWorkFunction = 2.87 * electronVolt; // Calcium
const defaultElectronVel = calcElectronVel(defaultPhotonEnergy, defaulWorkFunction);

const [voltage, setVoltage] = useState(0);
const [showAllElectrons, setShowAllElectrons] = useState(true);

const [intensity, setIntensity] = useState(50);
const [metal, setMetal] = useState({ name: "Calcium", workFunction: 2.87, atomicNumber: 20 });
const [workFunction, setWorkFunction] = useState(defaulWorkFunction)

const [wavelength, setWavelength] = useState(380); // for display on UI
const [frequency, setFrequency] = useState(defaultPhotonFrequency);
const [electronVel, setElectronVel] = useState(defaultElectronVel);
const [acceleration, setAcceleration] = useState(0);
const [electronMaxVel, setElectronMaxVel] = useState(0);
const [spawnProbability, setSpawnProbability] = useState(calcProbability(20, defaultPhotonEnergy));

const [enFreqData, setEnFreqData] = useState(generateEnergyFrequencyData(defaultPhotonFrequency, defaulWorkFunction));
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
}

function handleChangeWavelength(value) {
  setWavelength(value);
  const newWavelengthInM = value / 1000000000;
  const newFrequency = calcPhotonFrequency(newWavelengthInM);
  setFrequency(newFrequency);
  const newEnergy = calcPhotonEnergy(newFrequency);
  const electronMaxVel = calcElectronVel(newEnergy, workFunction)
  setElectronVel(electronMaxVel);
  setElectronVelValue(electronMaxVel > 0 ? Math.round(electronMaxVel) : 0)
  const probability = calcProbability(metal.atomicNumber, newEnergy);
  setSpawnProbability(probability);
}

function handleChangeFrequency(value) {
  setFrequency(value);
  const newWaveLength = Math.round(calcWavelengthFromFreq(value) * 1000000000);
  setWavelength(newWaveLength);
  const newPhotonEnergy = calcPhotonEnergy(value);
  console.log(`new photon energy: ${newPhotonEnergy}`)
  const newElectronVel = calcElectronVel(newPhotonEnergy, workFunction)
  console.log(`new electron velocity: ${newElectronVel}`)
  setElectronVel(newElectronVel);
  setElectronVelValue(newElectronVel > 0 ? Math.round(newElectronVel) : 0);
  const probability = calcProbability(metal.atomicNumber, newPhotonEnergy);
  setSpawnProbability(probability);
}


function handleChangeVoltage(value) {
  setVoltage(value);
  setAcceleration(calcAcceleration(value));
  const maxVel = calcMaxVel(Math.abs(value));
  setElectronMaxVel(maxVel);
}

// #endregion

// --== UI settings ==--
// #region

const [metalDropdownOpen, setMetalDropdownOpen] = useState(false);
const [velocityEditable, setVelocityEditable] = useState(false);
const [electronVelValue, setElectronVelValue] = useState(Math.round(defaultElectronVel));
const [tempVelValue, setTempVelValue] = useState()
const [velWarningOpen, setVelWarningOpen] = useState(false)

function toggleDarkMode() {
  setDarkMode(!darkMode)
  setTheme(!darkMode ? 'dark' : 'light')
}

function startEditingVelocity() {
  setTempVelValue(electronVelValue);
  setVelocityEditable(true)
}

function endEditing() {
  const calculatedWavelength = calcWavelength(tempVelValue);
  const calculatedWLInm = calculatedWavelength * 1000000000
  if (calculatedWLInm >= 100 && calculatedWLInm <= 900) {
    setElectronVel(tempVelValue);
    setElectronVelValue(tempVelValue);
    setWavelength(Math.round(calculatedWLInm));
    setFrequency(calcPhotonFrequency(calculatedWLInm));
    setSpawnProbability(calcProbability(metal.atomicNumber, calcPhotonEnergy(calcPhotonFrequency(calculatedWavelength))));
  } else {
    setVelWarningOpen(true)
  }
  setVelocityEditable(false);
}

// #endregion


return (
  <>
    <nav className='flex p-2 justify-between'>
      <p className='self-center'>A physics simulation</p>
      <Button variant='ghost' onClick={toggleDarkMode}>
        {darkMode ? <Moon /> : <Sun />}
      </Button>
    </nav>

    <main className='flex justify-center'>
      <div className='p-2 flex max-w-screen-xl'>
        <Card className='m-2'>
          <CardHeader>

            <div className='flex justify-between items-center'>
              <CardTitle>Photoelectric effect</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='icon'>
                    <CircleHelp />
                  </Button>
                </PopoverTrigger>
                <PopoverContent side='left'>
                  <div>
                    <p>Information</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent>
            <PhysicsSimulation electronAcceleration={acceleration} electronMaxVel={electronMaxVel} spawnProbability={spawnProbability} electronVel={electronVel} showAllElectrons={showAllElectrons} bgColor={darkMode ? 'dark' : 'light'} themeColor={darkMode ? [34, 195, 93] : [22, 162, 73]} intensity={intensity} wavelength={wavelength} />
          </CardContent>
        </Card>
        <ScrollArea className='h-auto'>
          <div className='flex flex-col'>
            <Card className='m-2'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <p>Metal:</p>
                  <DropdownMenu onOpenChange={() => (setMetalDropdownOpen(!metalDropdownOpen))}>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost'>{!metalDropdownOpen ? <ChevronDown /> : <ChevronUp />}{metal.name}</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Elements</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <ScrollArea className='h-72 w-48'>
                          <div>
                            {
                              elements.map((obj) => {
                                return (
                                  <DropdownMenuItem key={`dropdown-item-${obj.name}`}>
                                    <div className='flex justify-between items-center gap-2'>
                                      <p>{obj.name}</p>
                                      <p>φ: {obj.workFunction} eV</p>
                                    </div>
                                  </DropdownMenuItem>
                                )
                              })
                            }
                          </div>
                        </ScrollArea>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
            <Card className='m-2'>
              <CardContent className='p-4'>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='showElectronsCheck' onCheckedChange={() => (setShowAllElectrons(!showAllElectrons))} />
                  <label htmlFor='showElectronsCheck'>Show only highest energy electrons</label>
                </div>
                <div className='flex justify-between py-2'>
                  <p>Intensity</p>
                  <p>{intensity}</p>
                </div>
                <Slider
                  defaultValue={[50]}
                  value={[intensity]}
                  max={100}
                  step={1}
                  className='w-full'
                  onValueChange={(value) => (setIntensity(value[0]))}
                />

                <div className='flex my-2 justify-between'>
                  <div className='flex items-center'>
                    <AudioWaveform />
                    <p className='mx-2 py-2'>Wavelength</p>
                  </div>
                  <p className='self-center'>{wavelength} nm</p>
                </div>
                <WavelengthSlider value={[wavelength]} onValueChange={(value) => (handleChangeWavelength(value[0]))} />
                <div className='flex my-2 justify-between items-center'>
                  <div className='flex items-center'>
                    <AudioLines />
                    <p className='px-2 py-2'>Frequency</p>
                  </div>
                  <p>{Math.round(frequency / 1e12) / 1e3} x10^15 Hz</p>
                </div>
                <Slider
                  defaultValue={[defaultPhotonFrequency]}
                  value={[frequency]}
                  min={minPhotonFrequency}
                  max={maxPhotonFrequency}
                  onValueChange={(value) => (handleChangeFrequency(value))}
                />
              </CardContent>
            </Card>
            <Card className='m-2'>
              <CardContent className='p-4'>
                <div className='flex flex-col justify-between items-start'>
                  <div className='flex items-center space-x-2 mb-2'>
                    <Gauge />
                    <p>Max electron velocity</p>
                  </div>
                  <div className='flex justify-between justify-between items-center w-full'>
                    {
                      velocityEditable ?
                        <Input value={tempVelValue} onChange={(e) => (setTempVelValue(e.target.value))} />
                        : <p>{electronVelValue} m/s</p>
                    }
                    {
                      !velocityEditable ?
                        <Button variant='ghost' onClick={startEditingVelocity}>
                          <Pencil />
                        </Button>
                        : <Button variant='ghost' onClick={endEditing}>
                          <Save />
                        </Button>
                    }
                  </div>
                  <Popover open={velWarningOpen}>
                    <PopoverAnchor />
                    <PopoverContent>
                      <div className='flex justiify-between items-start'>
                        <p>Could not calculate a wavelength within 100-900 nm for this velocity</p>
                        <Button onClick={() => (setVelWarningOpen(false))}>
                          <X />
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>
            <Card className='m-2'>
              <CardContent>
                <div className='flex justify-between items-center my-4'>
                  <p>Voltage</p>
                  <p>{voltage} V</p>
                </div>
                <Slider
                  value={[voltage]}
                  max={2}
                  min={-2}
                  step={0.01}
                  onValueChange={(value) => (handleChangeVoltage(value))}
                />
              </CardContent>
            </Card>
            <Card className='m-2'>
              <CardHeader>
                <CardTitle>Electron energy vs photon frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <Plot data={enFreqData} chartConfig={chartConfig} />
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </main>
    <footer>
      <p>Made by Thomas Storhaug with Excalibur.js and Next.js</p>
    </footer>
  </ >
)
}
