import express from 'express';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import musicRouter from './routes/music.routes.js';
import path from 'path';

// configurating dotenv
config();
const app = express();
// resolving path to get current director depending on user's device.
const __dirname = path.resolve();

// setting up middleware for express to use json response and request
app.use(express.json());

// using the routes defined by musicRouter
app.use( '/api/music/' , musicRouter );

// serving static routes for music and playlist folder
app.use( '/storage/music/' , express.static( path.join( `${__dirname}/backend` , 'storage/music' ) ) );
app.use( 'storage/playlist' , express.static( path.join( `${__dirname}/backend` , 'storage/playlist' ) ) );

// listening to a PORT and starting the server
app.listen(process.env.PORT, ()=>{
    console.log(`Server started at http://localhost:${process.env.PORT}`);
    connectDB();
});