import express from 'express'
import { addMovie, getMovies, getMoviesById } from '../controller/movie.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post("/",protect , addMovie)
router.get("/", getMovies);
router.get("/:id", getMoviesById);

export default router;