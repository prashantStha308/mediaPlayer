// services/cloudinary.services.js
import cloudinary from '../config/cloudinary.config.js';
import { Readable } from 'stream';


export const uploadToCloudinary = (fileBuffer, folder, resourceType = 'auto') => {
    return new Promise((resolve, reject) => {
        // Create a stream from the buffer
        const stream = Readable.from(fileBuffer);

        // Create upload stream to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: resourceType
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );

        // Pipe the file buffer to the upload stream
        stream.pipe(uploadStream);
  });
};


export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
    try {
        const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType
        });
        return result;
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
        throw error;
    }
};