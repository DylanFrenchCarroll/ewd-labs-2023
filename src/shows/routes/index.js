import express from 'express';
import ShowsController from '../controllers/index.js';
// import AccountsController from '../../accounts/controllers/index.js';
import FirebaseController from '../../firebase/firebase.js';

const createShowsRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const showsController = ShowsController(dependencies);
    // const accountsController = AccountsController(dependencies);
    const firebaseController = FirebaseController();

    router.route('/*')
        .all( function(req, res, next){
            firebaseController.verify(req, res, next);
        });

    router.route('/popular')
        .get(showsController.getPopularTVShows);

    router.route('/:id')
        .get(showsController.getShow);
    
    router.route('/:id/images')
        .get(showsController.getShowImages);


    return router;
};
export default createShowsRouter;
