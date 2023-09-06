import { Router } from "express";
import {addToLikedMovies, getLikedMovies, removeLikedMovies} from '../controllers/UserController.js'

const router = Router();

router.post("/add", addToLikedMovies);
router.get("/liked/:email", getLikedMovies);
router.put("/delete", removeLikedMovies);

export default router;