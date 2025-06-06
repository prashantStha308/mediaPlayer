import express from 'express';
import { connectDB } from './config/db.js';
import musicRouter from './routes/music.routes.js';
import playlistRouter from './routes/playlist.routes.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const app = express();

// resolving correct path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), '..'); 

// middleware for JSON parsing
app.use(express.json());

// setup CORS
const corsOptions = {
    origin: 'http://localhost:5173', // allow your frontend dev server
};
app.use(cors(corsOptions));

// API routes
app.use('/api/music', musicRouter);
app.use('/api/playlist', playlistRouter);


// production setup for serving frontend build
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

// start server
app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
    connectDB();
});
