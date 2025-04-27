import { Play , Pause , SkipBack , SkipForward } from 'lucide-react';
import useMusicStore from '../../store/music.store';
import useMusicControls from '../../services/musicPlayer.services';

const MediaController = () => {

    const { isPlaying } = useMusicStore();
    const { playPauseTrack ,prevTrack ,nextTrack } = useMusicControls();

  return (
    <div className="flex items-center justify-center gap-4 ">
        {/* play previous tracks */}
        <button className='text-gray-400 hover:text-white p-3' onClick={prevTrack} >
            <SkipBack size={16} />
        </button>

        {/* play */}
        {isPlaying ?
            <button className='bg-neutral-300 hover:bg-purple-500 hover:text-white transition-all duration-100 ease-out text-gray-900 rounded-full p-3' onClick={playPauseTrack} >
                <Pause size={18} />
            </button>
            :
            <button className='bg-neutral-300 hover:bg-purple-500 hover:text-white transition-all duration-100 ease-out text-gray-900 rounded-full p-3' onClick={playPauseTrack} >
                <Play size={18} />
            </button>
        }

        {/* play next track */}
        <button className='text-gray-400 hover:text-white p-3' onClick={nextTrack} >
            <SkipForward size={16} />
        </button>
    </div>
  )
}

export default MediaController