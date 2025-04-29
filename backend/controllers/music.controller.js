import Music from '../models/music.model.js';
import mongoose from 'mongoose';
import { uploadToCloudinary , deleteFromCloudinary } from '../services/cloudinary.services.js';

const DEFAULT_IMAGE_URL = "https://res.cloudinary.com/dww0antkw/image/upload/v1745858916/defaultImg_g8yd1y.svg";
const DEFAULT_IMAGE_PUBLIC_ID = "defaultImg_g8yd1y";


// Upload music 
export const uploadMusic = async (req, res) => {
    try {
        const { title, description, album, genre } = req.body;
        const artists = JSON.parse(req.body.artist);
        console.log(req.body);
        // Validate request
        if (!title || !artists) {
            return res.status(400).json({
                success: false,
                message: "Title and artist are required"
            });
        }
        
        // Check if audio file exists
        if (!req.files || !req.files.audio) {
            return res.status(400).json({
                success: false,
                message: "Audio file is required"
            });
        }
        
        // Upload audio file to Cloudinary
        const audioFile = req.files.audio[0];
        const audioResult = await uploadToCloudinary(
            audioFile.buffer, 
            "music", 
            "video" // Cloudinary uses "video" resource type for audio files
        );
        
        // Upload image file to Cloudinary (if provided)
        let imageUrl = DEFAULT_IMAGE_URL;
        let imagePublicId = DEFAULT_IMAGE_PUBLIC_ID;
        
        if (req.files.coverArt && req.files.coverArt[0]) {
            const imageFile = req.files.coverArt[0];
            const imageResult = await uploadToCloudinary(
                imageFile.buffer, 
                "images", 
                "image"
            );
            imageUrl = imageResult.secure_url;
            imagePublicId = imageResult.public_id;
        }
        
        // Create music document in MongoDB
        const music = new Music({
            title,
            description,
            artists,
            album,
            genre: genre || "Unknown",
            audioUrl: audioResult.secure_url,
            audioPublicId: audioResult.public_id,
            imageUrl: imageUrl,
            imagePublicId: imagePublicId
        });
        
        // Save to database
        await music.save();
        
        return res.status(201).json({
            success: true,
            data: music,
            message: "Music uploaded successfully"
        });
        
    } catch (error) {
        console.error("Error in uploadMusic:", error);
        return res.status(500).json({
            success: false,
            data: null,
            message: error.message || "Something went wrong"
        });
    }
};


export const getAllMusic = async ( req , res ) => {
    try {
        const musicList = await Music.find({});
        res.status(200).json({ success: true , data: musicList , message: "Fetched data successfully" });
    } catch (error) {
        return res.status(500).json({ success: false , message: error.message });
    }
}


export const getMusicById = async ( req , res ) => {
    const { id } = req.params;
    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({ success: false , message: "Invalid id" });
    }
    try {
        const target = await Music.findById( id );
        if( !target ){
            return res.status(404).json({ success: false , message: "Music not found" })
        }
        res.status(200).json({ success: true , data: target , message: "Found music" });
    } catch (error) {
        return res.status(500).json({ success: false , message: error.message || "Some unknown error occured" });
    }
}


export const updateMusic = async ( req , res ) => {
    const updates = req.body;
    console.log(updates);
    const { id } = req.params;

    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({ success: false , message: "Invalid id" });
    }
    if( !updates.title ){
        return res.status(400).json({ success: false , message: "Incomplete request. Required data/s missing" });
    }
    try {
        const updatedMusic = await Music.findByIdAndUpdate( id , updates , { new: true } );
        if( !updatedMusic ){
            return res.status(404).json({ success: false , message: "Music not Found" });
        }
        res.status(200).json({ success: true , data: updatedMusic , message: "Data updated successfully" })
    } catch (error) {
        return res.status(500).json({ success: false , message: error.message });
    }
}


// Delete music
export const deleteMusic = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find music by ID
        const music = await Music.findById(id);
        if (!music) {
            return res.status(404).json({
                success: false,
                message: "Music not found"
            });
        }
        
        // Delete audio file from Cloudinary
        if (music.audioPublicId) {
            await deleteFromCloudinary(music.audioPublicId, 'video');
        }
        
        // Delete image file from Cloudinary if it's not the default
        if (music.imagePublicId && music.imagePublicId !== DEFAULT_IMAGE_PUBLIC_ID) {
            await deleteFromCloudinary(music.imagePublicId, 'image');
        }
        
        // Delete from database
        await Music.findByIdAndDelete(id);
        
        return res.status(200).json({
            success: true,
            message: "Music deleted successfully"
        });
      
    } catch (error) {
        console.error("Error in deleteMusic:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};