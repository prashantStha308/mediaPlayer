
import useMusicStore from '../../store/music.store';
import useMusicControls from '../../services/musicPlayer.services';
import { useEffect, useRef, useState } from 'react';

const Seeker = () => {
    const {setSeekSliderRefs ,currentTime , totalDuration , seekPosition } = useMusicStore();
    const { seekTo} = useMusicControls();
    const [sliderValue, setSliderValue] = useState(0);
    const seekerRef = useRef(null);
    // Register this slider with the music store
    useEffect(() => {
        if (seekerRef.current !== null) {
            setSeekSliderRefs(prev => [...(Array.isArray(prev) ? prev : []), seekerRef]);
        }
        
        // Cleanup function to remove this ref when component unmounts
        return () => {
            setSeekSliderRefs(prev => 
                Array.isArray(prev) ? prev.filter(ref => ref !== seekerRef) : prev
            );
        };
    }, [setSeekSliderRefs]);

    // Subscribe to the global seek position
    useEffect(() => {
        if (typeof seekPosition === 'number') {
            setSliderValue(seekPosition);
        }
    }, [seekPosition]);
  return (
    <div className="md:w-sm flex justify-center items-center">
        <div className="px-2 text-xs"> {currentTime || "00:00"} </div>
            <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                ref={seekerRef}
                onChange={(e) => {
                    const newValue = parseFloat(e.target.value);
                    setSliderValue(newValue);
                    seekTo(e);
                }}
                className="md:w-xs h-[5px] bg-black opacity-100 appearance-none rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer  bg-gradient-to-r from-purple-300 to-purple-700 "
            />
        <div className="px-2 text-sm"> {totalDuration || "00:00"} </div>
    </div>
  )
}

export default Seeker