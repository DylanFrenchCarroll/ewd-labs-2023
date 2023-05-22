import express from 'express';
import AccountsController from '../controllers/index.js';
import ValidationController from '../controllers/ValidationController.js'; 
import FirebaseController from '../../firebase/firebase.js';

const createRouter = (dependencies) => {
    const router = express.Router();
    // load controller with dependencies
    const accountsController = AccountsController(dependencies);
    const validationController = ValidationController(dependencies);//Add this lineLoad validation controller with dependencies
    const firebaseController = FirebaseController(dependencies);
   
    router.route('/*')
        .all( function(req, res, next){
            firebaseController.verify(req, res, next);
        });

    router.route('/')
        .post(validationController.validateAccount,accountsController.createAccount); //add validateAccount to route

    router.route('/')
        .get(accountsController.listAccounts);

    router.route('/:id')
        .get(accountsController.getAccount);

    router.route('/:id')
        .post(accountsController.updateAccount);    
        
    router.route('/security/token')
        .post(accountsController.authenticateAccount);

    router.route('/:id/movies/favourites')
        .post(accountsController.addMovieFavourite);
        
    router.route('/:id/movies/favourites')
        .get(accountsController.getMovieFavourites);

    router.route('/:id/movies/mustWatches')
        .post(accountsController.addMustWatch);
        
    router.route('/:id/movies/mustWatches')
        .get(accountsController.getMustWatch);

    router.route('/:id/shows/favourites')
        .post(accountsController.addShowFavourite);
        
    router.route('/:id/shows/favourites')
        .get(accountsController.getShowFavourites);

    router.route('/:id/persons/favourites')
        .post(accountsController.addPersonFavourite);
        
    router.route('/:id/persons/favourites')
        .get(accountsController.getPersonFavourites);

    return router;
};
export default createRouter;
