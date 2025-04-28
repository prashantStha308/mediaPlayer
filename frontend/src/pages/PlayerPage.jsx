import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getMusicById } from "../services/music.services";
import Player from "../components/Player";
import useMusicStore from "../store/music.store";
import { Star } from "lucide-react";
import Loader from "../components/Loader.jsx"

const PlayerPage = () => {

    // playlist banayepaxi make this page independent on id
    const {id} = useParams();
    const router = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {currentTrack} = useMusicStore();

    useEffect(() => {
        const fetchData = async() => {
            if( id === undefined ){
                console.log("Is null");
                return
            }
            try {
                const res = await getMusicById(id);
                if (!res.success) {
                  throw new Error(res.message);
                }
                setData(res.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
        
    }, [id]);

    useEffect(() => {
        if (id === undefined) {
            if (currentTrack._id) {
                router(`/player/${currentTrack._id}`);
            } else {
                setLoading(false);  // Stop loading if no id and no currentTrack
            }
            return;
        }
    }, [id, currentTrack]);
    console.log(currentTrack);

    if (loading) return <Loader /> ;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No music found</div>;

    return (
        <section className="grid justify-center h-full ">
            <div className="grid items-center content-center ">
                <div className="grid justify-center aspect-square">
                    <img 
                        src={currentTrack?.imageUrl || "/defaultImg.svg"} 
                        alt={currentTrack?.title + "'s coverart"} 
                        className="aspect-square object-cover w-xs border border-neutral-400 rounded-sm bg-neutral-200 " 
                    />
                    <div className="grid" >
                        <div className="flex items-center justify-between " >
                            <p className="text-left text-lg" >{ currentTrack?.title || "Unknown Track" }</p>
                            <button >
                                <Star size={20} className="hover:fill-amber-500" />
                            </button>
                        </div>
                        <span className="text-xs text-gray-300">
                            {currentTrack?.artists && currentTrack.artists.length > 0 
                            ? currentTrack.artists.map((item, index) => (
                                    <span key={index}>
                                    {item}{index !== currentTrack.artists.length - 1 && ', '}
                                    </span>
                                )) 
                            : "Unknown Artist"
                            }
                        </span>
                    </div>
                </div>
                <Player track={data} />
            </div>
        </section>
    );
}

export default PlayerPage;