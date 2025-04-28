import { useNavigate } from "react-router-dom";
import { uploadMusic } from "../services/music.services";
import { useState } from "react";
import Loader from "../components/Loader.jsx"

const Upload = () => {
    const navigate = useNavigate();
    const [ loading , setLoading ] = useState(false);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log("Submitting...")
        const formData = new FormData(e.target);
        const audioFile = formData.get('audio');
        // remove the metadata of
        // create a clean blob
        const buffer = await audioFile.arrayBuffer();
        const cleanedBlob = new Blob( [buffer] , { type: audioFile.type } );

        // convert blob to file
        const cleanedFile = new File( [cleanedBlob] , audioFile.name , {type: audioFile.type} );

        formData.set( "audio" , cleanedFile );
        try {
            setLoading(true);
            const res = await uploadMusic(formData);
            if( !res.success ){
                throw new Error(res.message);
            }
            navigate(`/`);
        } catch (error) {
            console.log("Failed upload: " , error.message);
            return;
        }finally{
            setLoading(false);
        }

    }

    if(loading) return <Loader />;

  return (
    <section id="upload" >
        <h1 className="text-center text-2xl font-bold" > Upload Music </h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data" >
            <div className="flex">
                <label htmlFor="title"> Music Title: </label>
                <input type="text" name="title" className="p-2 rounded-sm border border-white" required />
            </div>
            <div className="flex">
                <label htmlFor="title"> Artist: </label>
                <input type="text" name="artist" className="p-2 rounded-sm border border-white" required />
            </div>
            <div className="flex">
                <label htmlFor="musicDescription"> Description </label>
                <textarea name="musicDescription" id="musicDescription" className="p-2 rounded-sm border border-white resize-none" ></textarea>
            </div>

            <div className="flex gap-0 items-center border border-white w-fit" >
                <label htmlFor="audio" className="bg-purple-500 rounded-md p-2 cursor-pointer" > Choose music </label>
                <input type="file" name="audio" id="audio" accept="audio/*" required />
            </div> 
            <div className="flex gap-0 items-center border border-white w-fit" >
                <label htmlFor="coverArt" className="bg-purple-500 rounded-md p-2 cursor-pointer" > Choose cover art </label>
                <input type="file" name="coverArt" id="coverArt" accept="coverArt/*" />
            </div> 
            <button type="submit" className="bg-purple-500 rounded-md p-2 cursor-pointer"> Submit </button>
        </form>

    </section>
  )
}

export default Upload


