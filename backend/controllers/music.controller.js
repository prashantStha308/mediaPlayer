import Music from '../models/music.model.js';
import mongoose from 'mongoose';
import fs from 'fs';

/**
 * Adds a new music entry to the database.
 * POST method
 * http://localhost:5000/api/music/
 * 
 * @param {import('express').Request} req - The request object containing the music data.
 * @param {import('express').Response} res - The response object for sending results.
 * @returns {Promise<void>} Sends a JSON response with:
 * - `{ success: false, message: string }` on failure.
 * - `{ success: true, data: Object, message: string }` on success.
 */
export const addMusic = async ( req , res ) => {
    const body = req.body;
    const audio = req.file;
    // if title or audio file or audio file path doesn't exist, exist process.
    if( !body.title || !audio || !audio.path ){
        return res.status(400).json({ success: false , message: "Incomplete request. Required data/s missing" });
    }
    const newMusic = new Music({
        ...body,
        url: audio.path
    });
    try {
        await newMusic.save();
        res.status(201).json({ success: true , data: newMusic , message: "Creation Successfull" });
    } catch (error) {
        return res.status(500).json({ success: false , message: error.message });
    }
}

/**
 * Gets all the music entries from the database
 * 
 * GET method
 * http://localhost:5000/api/music/
 * 
 * @param {import('express').Request} req - The request object (no parameters required).
 * @param {import('express').Response} res - The respose object for sending results.
 * @returns {Promise<void>} Sends a JSON response with:
 * - `{ success: false , message: string }` on failure.
 * - `{ success: true , data: Object , message: string }` on success.
 */
export const getAllMusic = async ( req , res ) => {
    try {
        const musicList = await Music.find({});
        res.status(200).json({ success: true , data: musicList , message: "Fetched data successfully" });
    } catch (error) {
        return res.status(500).json({ success: false , message: error.message });
    }
}

/**
 * Gets music of a certain ID. The Id is passed via route parameters.
 * 
 * GET method
 * http://localhost:5000/api/music/:id
 * 
 * @param {import('express').Request} req - The request object, gets an ID by parameter in route ( req.params )
 * @param {import('express').Response} res - The response object for sending results.
 * @returns {Promise<void>} Sends a JSON response with:
 * - `{ success: false , message: string }` on failure.
 * - `{ success: true , data: Object , message: string }` on success.
 */
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
        return res.status(500).json({ success: false , message: error.message });
    }
}

/**
 * Updates the entry of a certain music of ID. The Id is passed via route parameters.
 * 
 * PUT method
 * http://localhost:5000/api/music/:id
 * 
 * @param {import('express').Request} req - The request object, gets an ID by parameter in route ( req.params )
 * @param {import('express').Response} res - The response object for sending results.
 * @returns {Promise<void>} Sends a JSON response with:
 * - `{ success: false , message: string }` on failure.
 * - `{ success: true , data: Object , message: string }` on success.
 */
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

/**
 * Deletes music of a certain ID. The Id is passed via route parameters.
 * 
 * DELETE method
 * http://localhost:5000/api/music/:id
 * 
 * @param {import('express').Request} req - The request object, gets an ID by parameter in route ( req.params )
 * @param {import('express').Response} res - The response object for sending results.
 * @returns {Promise<void>} Sends a JSON response with:
 * - `{ success: boolean , message: string }`
 */
export const deleteMusic = async ( req , res ) => {
    const { id } = req.params;

    if( !mongoose.Types.ObjectId.isValid(id) ){
        return res.status(404).json({ success: false , message: "Invalid id" });
    }
    try {
        const deletedMusic = await Music.findByIdAndDelete( id );
        if( !deleteMusic ){
            return res.status(404).json({ success: false , message: "Music not Found" });
        }

        // delete the audio file 
        fs.unlink( deletedMusic.url , err => {
            if( err ){
                console.error(`Error deleting file: ${deletedMusic.url.split('/').pop()}. With error: `, err );
            }else{
                console.log(`Deleted file: ${ deletedMusic.url.split('/').pop() }, successfully`);
            }
        } );

        res.status(200).json({ success: true , message: 'Deleted Successfully' });
    } catch (error) {
        return res.status(500).json({ success: false , message: error.message });
    }
}