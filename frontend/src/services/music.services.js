import axios from "axios";

// utility functions
const setError = ( message , status ) => {
    return { success: false, data: null, message: message , status: status || 500 };
};

const setSuccess = (data, message , status) => {
    return { success: true, data : data , message: message , status: status || 200 };
};

// Get all music
export const getAllMusic = async () => {
    try {
        const res = await axios.get("/api/music/");
        const data = res.data;

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        return setError(error.message);
    }
};

// Get music by ID
export const getMusicById = async (mId) => {
    try {
        const res = await axios( `/api/music/${mId}` );
        const data = res.data;
        // Ensure the response data structure is correct
        if (data.success) {
            return data;  // Return the entire data object if success is true
        } else {
            throw new Error(data?.message);
        }
    } catch (error) {
        return setError(error.message);
    }
};

// Upload music
export const uploadMusic = async (newPost) => {
    try {
        if (!newPost.get("title") || !newPost.get('artist') ) {
            throw new Error("Required Fields not present");
        }

        if( !newPost.get('audio') ){
            throw new Error("Audio file not present");
        }

        const res = await axios.post("/api/music/", newPost, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        const { success, data, message } = res.data;

        if (!success) {
            throw new Error(message);
        }

        return setSuccess( data , message , 201 );

    } catch (error) {
        return setError(error.message);
    }
};
