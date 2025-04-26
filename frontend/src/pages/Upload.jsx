import { useNavigate } from "react-router-dom";
import { uploadMusic } from "../services/music.services";

const Upload = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const audioFile = formData.get('music');
        // remove the metadata of
        // create a clean blob
        const buffer = await audioFile.arrayBuffer();
        const cleanedBlob = new Blob( [buffer] , { type: audioFile.type } );

        // convert blob to file
        const cleanedFile = new File( [cleanedBlob] , audioFile.name , {type: audioFile.type} );

        formData.set( "music" , cleanedFile );
        try {
            const res = await uploadMusic(formData);
            const data = res.data;
            if( !res.success ){
                throw new Error(res.message);
            }
            console.log( "Uploaded Data: " , data );
            console.log( "URL: " , data.url );
            navigate(`/player/${res.data._id}`);
        } catch (error) {
            console.log("Failed upload: " , error.message);
            return;
        }

    }

  return (
    <section id="upload" >
        <h1 className="text-center text-2xl font-bold" > Upload Music </h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data" >
            <div className="flex">
                <label htmlFor="title"> Music Title: </label>
                <input type="text" name="title" className="p-2 rounded-sm border border-white" required />
            </div>
            <div className="flex">
                <label htmlFor="musicDescription"> Description </label>
                <textarea name="musicDescription" id="musicDescription" className="p-2 rounded-sm border border-white resize-none" ></textarea>
            </div>

            <div className="flex gap-0 items-center border border-white w-fit" >
                <label htmlFor="music" className="bg-purple-500 rounded-md p-2 cursor-pointer" > Choose music </label>
                <input type="file" name="music" id="music" accept="audio/*" required />
            </div> 
            <button type="submit" className="bg-purple-500 rounded-md p-2 cursor-pointer"> Submit </button>
        </form>

    </section>
  )
}

export default Upload


