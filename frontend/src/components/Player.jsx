import Seeker from './player/Seeker';
import MediaController from './player/MediaController';
import useMusicControls from '../services/musicPlayer.services';
import { useEffect } from 'react';

const Player = ({ track={} }) => {
    const { loadTrack } = useMusicControls();


    useEffect( ()=>{
        if( track && track._id ){
            loadTrack(track);
        }
    } , [ track._id ] );

  return (
    <section className="grid justify-center items-center gap-3" >
        {/* controls buttons */}
        <MediaController />
        {/* thumb */}
        <Seeker />
    </section>
  )
}

export default Player