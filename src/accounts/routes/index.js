import express from 'express';
import AccountsController from '../controllers/index.js';
import ValidationController from '../controllers/ValidationController.js'; 

const createRouter = (dependencies) => {
    const router = express.Router();
    // load controller with dependencies
    const accountsController = AccountsController(dependencies);
    const validationController = ValidationController(dependencies);//Add this lineLoad validation controller with dependencies


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

    router.route('/:id/movieFavourites')
        .post(accountsController.addMovieFavourite);
        
    router.route('/:id/movieFavourites')
        .get(accountsController.getMovieFavourites);

    router.route('/:id/showFavourites')
        .post(accountsController.addShowFavourite);
        
    router.route('/:id/showFavourites')
        .get(accountsController.getShowFavourites);

    router.route('/:id/personFavourites')
        .post(accountsController.addPersonFavourite);
        
    router.route('/:id/personFavourites')
        .get(accountsController.getPersonFavourites);

    router.route('/:id/mustWatches')
        .post(accountsController.addMustWatch);
        
    router.route('/:id/movieFavourites')
        .get(accountsController.getMustWatch);

    return router;
};
export default createRouter;
