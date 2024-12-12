import * as Slider from '@radix-ui/react-slider';

export function CustomSlider({ defaultValue, max, min, step, rootClass, trackClass, rangeClass, thumbClass }) {
    const _rootClass = rootClass ? rootClass : "relative h-5 flex items-center";
    const _trackClass = trackClass ? trackClass : "bg-gray-200 rounded-full relative flex-1 h-2";
    const _rangeClass = rangeClass ? rangeClass : "absolute bg-blue-500 rounded-full h-full";
    const _thumbClass = thumbClass ? thumbClass : "block w-5 h-5 bg-white border-2 border-blue-500 rounded-full focus:outline-none";
    return (
        <Slider.Root className={_rootClass} defaultValue={defaultValue} max={max} min={min} step={step}>
            <Slider.Track className={_trackClass}>
                <Slider.Range className={_rangeClass} />
            </Slider.Track>
            <Slider.Thumb className={_thumbClass} />
        </Slider.Root>
    );
}

/**
 * IRROGGBIFUV - Infrarød Rød Oransje Gul Grønn Blå Indigo Fiolett Ultrafiolett
 * @returns <Slider>
 */
export function WavelengthSlider(props) {
    // UV: 100-380 - 35%     Violet: 380-450 - 8,75%    Blue: 450-485 - 4,375%    Cyan: 485-500 - 1,875%   
    // Green: 500-565 - 8,125%  Yellow: 565-590 - 3,125%    Orange: 590-625 - 4,375%    
    // Red: 625-750 - 15,625%  IF: 750-900: 18,75%

    return (
        <Slider.Root {...props} max={900} min={100} step={1} className="relative h-5 flex items-center">
            <Slider.Track className='flex flex-1 h-6 basis-full'>
                <span className='relative bg-neutral-500 h-6 UV text-center rounded-l'>UV</span>
                <span className='relative h-6 bg-gradient-to-r from-black via-violet-500 to-blue-500 spectrum_violet'></span>
                <span className='relative h-6 bg-gradient-to-r from-blue-500 to-cyan-500 spectrum_blue'></span>
                <span className='relative h-6 bg-gradient-to-r from-cyan-500 to-green-500 spectrum_cyan'></span>
                <span className='relative h-6 bg-gradient-to-r from-green-500 to-yellow-500 spectrum_green'></span>
                <span className='relative h-6 bg-gradient-to-r from-yellow-500 to-orange-500 spectrum_yellow'></span>
                <span className='relative h-6 bg-gradient-to-r from-orange-500 to-red-500 spectrum_orange'></span>
                <span className='relative h-6 bg-gradient-to-r from-red-500 to-black spectrum_red'></span>
                <span className='relative h-6 bg-neutral-500 spectrum_if text-center rounded-r'>IR</span>
            </Slider.Track>
            <Slider.Thumb className='block w-4 h-8 bg-background border border-primary/50 rounded focus:outline-none"' />
        </Slider.Root>
    )
}
