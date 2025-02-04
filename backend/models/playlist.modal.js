import mongoose from "mongoose";

/**
 * Describes how playlist's datas are stored in mongodb
 * @typedef { object } Playlist
 * 
 * @property { string } title - Name of Playlist `Required: true`
 * @property { string } description
 * @property { import('mongoose').Types.ObjectId[] } music - Array of music refs.
 * @property { Date } dateCreated - Describes when the playlist was created
 */
const playlistSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    music: [{
        type: mongoose.Types.ObjectId,
        ref: 'Music'
    }],
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})
/**
 * Model for Playlist in mongodb
 * 
 * @typedef { import('mongoose').Model<Playlist }
 */
const Playlist = mongoose.Model( 'Playlist' , playlistSchema );

export default Playlist;