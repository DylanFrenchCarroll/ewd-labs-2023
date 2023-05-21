import express from 'express';
import PersonsController from '../controllers/index.js';
// import AccountsController from '../../accounts/controllers/index.js';
import FirebaseController from '../../firebase/firebase.js';

const createPersonsRouter = (dependencies) => {
    const router = express.Router();
    // load controllers with dependencies
    const personsController = PersonsController(dependencies);
    // const accountsController = AccountsController(dependencies);
    const firebaseController = FirebaseController();

    router.route('/*')
        .all( function(req, res, next){
            firebaseController.verify(req, res, next);
        });

    router.route('/:id')
        .get(personsController.getPerson);

    router.route('/popular')
        .get(personsController.getPopularPersons);
    
    router.route('/:id/images')
        .get(personsController.getPersonImages);


    return router;
};
export default createPersonsRouter;
