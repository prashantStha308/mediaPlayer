import { create } from 'zustand';

const MusicStore = create( (set) =>({
    currentTrack: {},
    currentIndex: 0,
    seekSliderRef: null, //capture slider ko ref
    seekVolumeRef: null, //volume controle garna lai
    currentTime: "00:00",
    totalDuration: "00:00",
    isPlaying: false,
    updateTimer: null, //setInterval ko lagi
    audioElementRef: null,
    setCurrentTrack: (track) => {set({currentTrack: track})},
    setCurrentIndex: (index) =>{set({currentIndex: index})},
    setSeekSliderRef: (time)=>{set({seekSliderRef: time})},
    setSeekVolumeRef: (volume)=>{set({seekVolumeRef: volume})},
    setCurrentTime: (curr_time)=>{set({currentTime: curr_time})},
    setTotalDuration: (duration)=>{set({totalDuration: duration})},
    setIsPlaying: (bool)=>{set({isPlaying: bool})},
    setUpdateTimer: (intervalId)=>{set({updateTimer: intervalId})},
    setAudioElementRef: (ref)=>{set({audioElementRef: ref})},
}) );

const useMusicStore = ()=>  MusicStore();
export default useMusicStore;