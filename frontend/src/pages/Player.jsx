import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getMusicById } from "../services/music.services";

const Player = () => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No music found</div>;

    return (
        <div>
            <h2>Music Player</h2>
            <div className="music-info">
                <p>Title: {data.title}</p>
                {data.artist && <p>Artist: {data.artist}</p>}
                {data.album && <p>Album: {data.album}</p>}
            </div>
            <audio controls className="audio-player">
                <source src={data.url} type="audio/mp3" />
                Your browser does not support the audio element.
            </audio>
            
            {/* For debugging */}
            <div className="debug-info" style={{marginTop: '20px', fontSize: '12px', color: '#666'}}>
                <p>Original URL: {data.url}</p>

            </div>
        </div>
    );
}

export default Player