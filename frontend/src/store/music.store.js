import { create } from 'zustand';

const MusicPlayerStore = create( (set) =>({
    audioSrc: "",
    audioImg: "",
    seekTime: "", //audio control garna lai
    audioVolume: "", //volume controle garna lai
    currentTime: "00:00:00",
    totalDuration: "00:00:00",
    isPlaying: false,
    updateTimer: null, //setInterval ko lagi
    setAudioSrc: (src)=>{set({ audioSrc: src })},
    setAudioImg: (src)=>{set({ audioImg: src })},
    setSeekTime: (time)=>{set({seekTime: time})},
    setAudioVolume: (volume)=>{set({audioVolume: volume})},
    setCurrentTime: (curr_time)=>{set({currentTime: curr_time})},
    setTotalDuration: (duration)=>{set({totalDuration: duration})},
    setIsPlaying: (bool)=>{set({isPlaying: bool})},
    setUpdateTimer: (intervalId)=>{set({updateTimer: intervalId})}
}) );

const useMusicPlayerStore = ()=>  MusicPlayerStore();
export default useMusicPlayerStore;