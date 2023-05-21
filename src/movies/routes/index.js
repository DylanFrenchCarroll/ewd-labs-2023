import express from 'express';
import MoviesController from '../controllers/index.js';
// import AccountsController from '../../accounts/controllers/index.js';
import FirebaseController from '../../firebase/firebase.js';

const createMoviesRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const moviesController = MoviesController(dependencies);
    // const accountsController = AccountsController(dependencies);
    const firebaseController = FirebaseController();

    router.route('/*')
        .all( function(req, res, next){
            firebaseController.verify(req, res, next);
        });

    router.route('/:id')
        .get(moviesController.getMovie);

    router.route('/')
        .get(moviesController.find);
    
    router.route('/upcoming')
        .get(moviesController.getUpcomingMovies);


    return router;
};
export default createMoviesRouter;
