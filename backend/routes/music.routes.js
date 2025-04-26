import e from "express";
import { uploadMusic, deleteMusic, getAllMusic, getMusicById, updateMusic } from "../controllers/music.controller.js";
import { musicUpload } from "../config/multerConfig.js";

const musicRouter = e.Router();

// api/music/
// gets all music
musicRouter.get( '/' , getAllMusic );

// api/music/
// adds music to database
musicRouter.post( '/' , musicUpload.single('music') , uploadMusic );

// api/music/:id
// gets music of certain id
musicRouter.get( '/:id' , getMusicById );

// api/muisc/:id
// updates music of certain id
musicRouter.patch( '/:id' , updateMusic );

// api/muisc/:id
// deletes a music of certain id
musicRouter.delete( '/:id' , deleteMusic );

export default musicRouter;