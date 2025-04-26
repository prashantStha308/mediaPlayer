import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import musicRouter from './routes/music.routes.js';
import playlistRouter from './routes/playlist.routes.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// configurating dotenv
config();
const app = express();
// resolving path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// setting up middleware for express to use json response and request
app.use(express.json());
// setup cors
const corsOptions = {
    origin: 'http://localhost:5173',
};
app.use(cors(corsOptions));

// using the routes defined by musicRouter
app.use( '/api/music/' , musicRouter );
app.use( 'api/playlist' , playlistRouter );

// serving static routes for music and playlist folder
app.use( '/storage/music/' , express.static( path.join( __dirname , 'storage/music' ) ) );
app.use( '/storage/playlist' , express.static( path.join( __dirname , 'storage/playlist' ) ) );

// listening to a PORT and starting the server
app.listen(process.env.PORT, ()=>{
    console.log(`Server started at http://localhost:${process.env.PORT}`);
    connectDB();
});