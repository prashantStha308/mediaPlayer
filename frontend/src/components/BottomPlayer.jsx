import { useEffect, useRef } from "react";
import useMusicStore from "../store/music.store"
import Player from "./Player"
import { Link } from "react-router-dom";

const BottomPlayer = () => {

	const { currentTrack , setAudioElementRef } = useMusicStore();
	const audioRef = useRef(null);

	useEffect( ()=>{
		if( audioRef.current !== null ){
			setAudioElementRef(audioRef);
		}
	} , [setAudioElementRef] );

	return (
		<section className=" px-2 py-3 mx-2 mb-1 bg-gray-900 rounded-md border border-gray-600 box-border flex justify-between items-center ">
			{/* Song details */}
			<section className="flex items-center gap-4" >
				<div className="bg-white rounded-xs p-2" >
					<img src={ "/defaultImg.svg"} alt="musicImg" width={40} height={40} />
				</div>
				<div className="grid content-evenly gap-0" >
					<span className=" p-0 m-0 text-left text-sm hover:underline cursor-pointer" > <Link to={ currentTrack._id ? `/player/${currentTrack._id}` : "/" } > { currentTrack.title || "Unknown Title"} </Link>  </span>
					<span className=" p-0 m-0 text-xs text-left hover:underline cursor-pointer" > { currentTrack.artist || "Unknown Artist"} </span>
				</div>
			</section>

			{/* Music Player */}
			<Player />

			{/* Music controllers */}
			<section>
				{/* player controls */}
				controllers
			</section>
		</section>
	)
}

export default BottomPlayer