import { useEffect, useState } from "react";
import ListTile from "../components/tiles/ListTile.jsx";
import {getAllMusic} from "../services/music.services.js";
import usePlaylistStore from "../store/playlist.store.js";
import Loader from "../components/Loader.jsx";

const Home = () => {
	const { playlist , loadPlaylist } = usePlaylistStore();
	const [loading , setLoading ] = useState(false);

	useEffect( ()=>{
		const loadMusic = async()=>{
			try {
				setLoading(true);
				const res = await getAllMusic();
				if( !res.success ){
					throw new Error(res.message);
				}
				loadPlaylist(res.data);
			} catch (error) {
				console.log(error.message);
			}finally{
				setLoading(false);
			}
		}
		loadMusic();
	}, [ loadPlaylist ] )

	if( loading ) return <Loader />

	return (
		<section className="px-2" >
			<section className="grid gap-4">
				<h1 className="text-left text-lg font-bold "> Trendings </h1>
				{playlist.length > 0 ?
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
						{
							playlist.map( ( music , index )=>(
								<ListTile track={music} key={index} />
							) )
						}
					</div>
				:
					<h1 className="text-center text-xl font-bold" > No Music found in database </h1>
				}
			</section>
		</section>
	)
}

export default Home