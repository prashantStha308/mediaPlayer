import useMusicStore from "../store/music.store";
import usePlaylistStore from "../store/playlist.store";

const MusicControls = () => {
    // music store
    const { 
        isPlaying, setIsPlaying, setCurrentTime, setTotalDuration, audioElementRef, currentTrack, setCurrentTrack, setUpdateTimer, updateTimer, currentIndex, setCurrentIndex, seekVolumeRef, updateAllSliders } = useMusicStore();

    // playlist store
    const { playlist = [], setPlaylist } = usePlaylistStore();

    const playTrack = () => {
        if (audioElementRef?.current && currentTrack.url) {
            audioElementRef.current.play();
            setIsPlaying(true);
        }
    }    
    
    const pauseTrack = () => {
        if (audioElementRef?.current && currentTrack.url) {
            audioElementRef.current.pause();
            setIsPlaying(false);
        }
        if (updateTimer) {
            clearInterval(updateTimer);
        }
    }
    
    const resetPlayer = () => {
        setCurrentTime("00:00");
        setTotalDuration("00:00");
        // Update all sliders to 0
        updateAllSliders(0);
    }

    const loadTrack = async(track) => {
        // Don't reload if it's the same track and already playing
        if (currentTrack._id === track._id && audioElementRef?.current?.src === track.url) {
            return;
        }
        let targetTrack = playlist.find(item => item._id === track._id);
        if (!targetTrack) {
            // incase track not present in playlist, add it
            setPlaylist([...playlist, track]);
        }
    
        const targetIndex = playlist.findIndex(item => item._id === track._id);
        if (targetIndex !== -1) {
            setCurrentTrack(track);
            setCurrentIndex(targetIndex);
        }
        if (updateTimer) {
            clearInterval(updateTimer);
        }
        resetPlayer();
        if (audioElementRef?.current) {
            audioElementRef.current.src = track.url;
            audioElementRef.current.load();
            audioElementRef.current.addEventListener('ended', nextTrack);
        }
        // update seeker every 1 second
        setUpdateTimer(setInterval(seekUpdate, 1000));
    }
    
    const playPauseTrack = () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    }
    
    const nextTrack = () => {
        // get the latest playlist
        const nextIndex = (currentIndex < playlist.length - 1) ? currentIndex + 1 : 0;
        const nextTrack = playlist[nextIndex];

        if (nextTrack) {
            setCurrentIndex(nextIndex);  
            loadTrack(nextTrack);
            playTrack();
        }
    }
    
    const prevTrack = () => {
        // get the latest playlist
        const prevIndex = (currentIndex !== 0) ? currentIndex - 1 : playlist.length - 1;
        const prevTrack = playlist[prevIndex];

        if (prevTrack) {
            setCurrentIndex(prevIndex);  
            loadTrack(prevTrack);
            playTrack();
        }
    }
    
    const seekTo = (e) => {
        if (audioElementRef?.current) {
            const percentage = parseFloat(e.target.value);
            const duration = audioElementRef.current.duration;
            
            if (!isNaN(duration)) {
                const seekTime = duration * (percentage / 100);
                audioElementRef.current.currentTime = seekTime;
                
                // Update all sliders to reflect this change
                updateAllSliders(percentage);
            }
        }
    }
    
    const setVolume = () => {
        if (seekVolumeRef?.current && audioElementRef?.current) {
            audioElementRef.current.volume = seekVolumeRef.current.value / 100;
        }
    }
    
    const seekUpdate = () => {
        let seekPosition = 0;
        if (audioElementRef?.current) {
            if (!isNaN(audioElementRef.current.duration)) {
                const curr_track = audioElementRef.current;
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);
                
                // Update all sliders with the current position
                updateAllSliders(seekPosition);

                // Calculate the time left and the total duration
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

                // Add a zero to the single digit time values
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

                setCurrentTime(`${currentMinutes}:${currentSeconds}`);
                setTotalDuration(`${durationMinutes}:${durationSeconds}`);
            }
        }  
    }

    return {
        loadTrack,
        playPauseTrack,
        nextTrack,
        prevTrack,
        seekTo,
        setVolume,
        seekUpdate
    };
};

const useMusicControls = () => MusicControls();

export default useMusicControls;