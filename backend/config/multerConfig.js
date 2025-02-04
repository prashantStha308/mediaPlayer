import multer from "multer";
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();
/**
 * @param {string} outputDir - ` outputDir is a path. `
 * this function creates the outputDir( argument ) folder, if it doesn't exist.
 */
function checkRoute ( outputDir ) {
    if( !fs.existsSync( outputDir ) ){
        fs.mkdirSync( outputDir , { recursive: true } );
    }
}

// defining storage routes
const musicRoute = path.join( 'backend' , 'storage' , 'music' );
checkRoute( musicRoute );

const playlistRoute = path.join( 'backend' , 'storage' , 'playlist' );
checkRoute(playlistRoute);

const musicStorage = multer.diskStorage({
    destination: function ( req , file , cb ) {
        cb( null , musicRoute );
    },
    filename: function ( req , file , cb ) {
        cb( null , 'song-' + Date.now() + '-' + file.originalname );
    }
});

export const musicUpload = multer({ storage: musicStorage });