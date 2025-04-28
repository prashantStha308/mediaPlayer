import mongoose from "mongoose";

const musicSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: 'No description available'
    }, 
    artists: [{
        type: String,
        default: 'Unknown',
        trim: true
    }],
    album: {
        type: String,
        default: 'Unknown'
    },
    genre: [{
        type: String
    }],
    audioUrl:{
        type: String,
        required: true
    },
    audioPublicId:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        default: null
    },
    imagePublicId:{
        type: String,
        default: null
    },
    likes:{
        type: Number,
        default: 0
    },
    plays:{
        type: Number,
        default: 0
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    }
});

const Music = mongoose.model('Music', musicSchema);
export default Music;
