import { useEffect, useRef } from "react";
import useMusicStore from "../store/music.store";

export default function AudioElement() {
    const { setAudioElementRef } = useMusicStore();
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
        setAudioElementRef(audioRef);
        }
    }, []);

    return <audio ref={audioRef} preload="metadata" />;
}