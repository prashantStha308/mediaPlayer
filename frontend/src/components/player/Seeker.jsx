
import useMusicStore from '../../store/music.store';
import useMusicControls from '../../services/musicPlayer.services';
import { useEffect, useRef } from 'react';

const Seeker = () => {
    const { setAudioElementRef ,setSeekSliderRef ,currentTrack } = useMusicStore();
    const { seekUpdate} = useMusicControls();

    const audioRef = useRef(null);
    const seekerRef = useRef(null);

    // set the ref of audio to currentTrackRef state
    useEffect( ()=>{
        if( audioRef.current !== null ){
            setAudioElementRef(audioRef);
        }
        if( seekerRef.current !== null ){
            setSeekSliderRef(seekerRef);
        }
    } , [setAudioElementRef , setSeekSliderRef] );
  return (
    <div className="md:w-sm flex justify-center items-center">
        <div className="px-2 text-xs">00:00</div>
            <input
                type="range"
                min="1"
                max="100"
                value="0"
                ref={seekerRef}
                onChange={seekUpdate}
                className="md:w-xs h-[5px] bg-black opacity-100 appearance-none rounded-full [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[15px] [&::-webkit-slider-thumb]:h-[15px] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer  bg-gradient-to-r from-purple-300 to-purple-700 "
            />
        <div className="px-2 text-sm">00:00</div>
        {currentTrack &&
            <div className=" absolute -bottom-10 opacity-0 -z-50">
                <audio ref={audioRef} >
                <source src={currentTrack.url} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
            </div>
        }
    </div>
  )
}

export default Seeker