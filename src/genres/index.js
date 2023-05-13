import express from 'express';
import {movies, movieReviews, movieDetails, genres} from '../movies/moviesData.js';
import uniqid from 'uniqid'


const router = express.Router(); 
router.get('/', (req, res) => {
    res.json(genres);
});


export default router;
