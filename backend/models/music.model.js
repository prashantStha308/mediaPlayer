import mongoose from "mongoose";

/**
 * Describes how music's data is stored in MongoDB
 * @typedef {object} Music
 * 
 * @property {string} title - `Required: true`
 * @property {string} description - A short description of the music.
 * @property {string[]} artists - An array of artist names.
 * @property {string} album - The album name.
 * @property {number} duration - Takes time in seconds (e.g., 120).
 * @property {string[]} genre - The genre of the music.
 * @property {Date} timeCreated - The date the music entry was created.
 */
const musicSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: 'No description available'
    }, 
    artists: [{
        type: String,
        default: 'Unknown'
    }],
    album: {
        type: String,
        default: 'Unknown'
    },
    duration: {
        type: Number,
        default: 0
    },
    genre: [{
        type: String
    }],
    url:{
        type: String
    },
    imgUrl:{
        type: String,
        default: ""
    },
    timeCreated: {
        type: Date,
        default: Date.now()
    }
});

/**
 * Model for Music
 * @type {import('mongoose').Model<Music>}
 */
const Music = mongoose.model('Music', musicSchema);

export default Music;
