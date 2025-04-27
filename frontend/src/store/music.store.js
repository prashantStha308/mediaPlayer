import { create } from 'zustand';

const MusicStore = create( ( set , get ) =>({
    currentTrack: {},
    currentIndex: 0,
    seekSliderRefs: [],
    seekVolumeRef: null, //volume controle garna lai
    currentTime: "00:00",
    totalDuration: "00:00",
    isPlaying: false,
    updateTimer: null, //setInterval ko lagi
    audioElementRef: null,
    seekPosition: 0,

    setCurrentTrack: (track) => {set({currentTrack: track})},
    setCurrentIndex: (index) =>{set({currentIndex: index})},
    setSeekSliderRefs: (ref) => set(state => {
        if (typeof ref === 'function') {
            return { seekSliderRefs: ref(state.seekSliderRefs) };
        } else {
            return { seekSliderRefs: [ref] };
        }
    }),
    setSeekVolumeRef: (volume)=>{set({seekVolumeRef: volume})},
    setCurrentTime: (curr_time)=>{set({currentTime: curr_time})},
    setTotalDuration: (duration)=>{set({totalDuration: duration})},
    setIsPlaying: (bool)=>{set({isPlaying: bool})},
    setUpdateTimer: (intervalId)=>{set({updateTimer: intervalId})},
    setAudioElementRef: (ref)=>{set({audioElementRef: ref})},
    setSeekPosition: (position) => set({ seekPosition: position }),

    updateAllSliders: (value) => {
        const { seekSliderRefs } = get();
        seekSliderRefs.forEach(refObj => {
            if (refObj && refObj.current) {
                refObj.current.value = value;
            }
        });
        set({ seekPosition: value });
    },
}) );

const useMusicStore = ()=>  MusicStore();
export default useMusicStore;