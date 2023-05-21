/* eslint-disable no-unused-vars */
import accountService from "../services/index.js";

export default (dependencies) => {

    const authenticateAccount = async (request, response, next) => {
        try {
            const { email, password } = request.body;
            const token = await accountService.authenticate(email, password, dependencies);
            response.status(200).json({ token: `BEARER ${token}` });
        } catch (error) {
            response.status(401).json({ message: 'Unauthorised' });
        }
    };

    const verify = async (request, response, next) => {
        try { 
        // Input
        const authHeader = request.headers.authorization;
        // Treatment
        const accessToken = authHeader.split(" ")[1];
        const user = await accountService.verifyToken(accessToken, dependencies);
        //output
        next();
    }catch(err){
        //Token Verification Failed
        next(new Error(`Verification Failed ${err.message}`));
        }
    };

    const createAccount = async (request, response, next) => {
        // Input
        const { firstName, lastName, email, password } = request.body;
        // Treatment
        const account = await accountService.registerAccount(firstName, lastName, email, password, dependencies);
        //output
        response.status(201).json(account);
    };
    const getAccount = async (request, response, next) => {
        //input
        const accountId = request.params.id;
        // Treatment
        const account = await accountService.getAccount(accountId, dependencies);
        //output
        response.status(200).json(account);
    };
    const listAccounts = async (request, response, next) => {
        // Treatment
        const accounts = await accountService.find(dependencies);
        //output
        response.status(200).json(accounts);
    };

    const updateAccount = async (request, response, next) => {
        // Input
        const id = request.params.id;
        const { firstName, lastName, email, password } = request.body;
        const account = await accountService.updateAccount(id, firstName, lastName, email, password, dependencies);
        response.status(201).json(account);
    };

    const addMovieFavourite = async (request, response, next) => {
        try {
            const { movieId } = request.body;
            const id = request.params.id;
            try{
                const account = await accountService.addMovieFavourite(id, movieId, dependencies);
                response.status(200).json(account);
            }catch (err ){
                // response.status(500).json(`Duplicate Favourite ${movieId}`);
                next(new Error(`Duplicate Favourite ${movieId}`));
            }

        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };
    const getMovieFavourites = async (request, response, next) => {
        try {
            const id = request.params.id;
            const favourites = await accountService.getMovieFavourites(id, dependencies);
            response.status(200).json(favourites);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    const addPersonFavourite = async (request, response, next) => {
        try {
            const { movieId } = request.body;
            const id = request.params.id;
            try{
                const account = await accountService.addPersonFavourite(id, movieId, dependencies);
                response.status(200).json(account);
            }catch (err ){
                // response.status(500).json(`Duplicate Favourite ${movieId}`);
                next(new Error(`Duplicate Favourite ${movieId}`));
            }

        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };
    const getPersonFavourites = async (request, response, next) => {
        try {
            const id = request.params.id;
            const favourites = await accountService.getPersonFavourites(id, dependencies);
            response.status(200).json(favourites);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    const addShowFavourite = async (request, response, next) => {
        try {
            const { movieId } = request.body;
            const id = request.params.id;
            try{
                const account = await accountService.addShowFavourite(id, movieId, dependencies);
                response.status(200).json(account);
            }catch (err ){
                // response.status(500).json(`Duplicate Favourite ${movieId}`);
                next(new Error(`Duplicate Favourite ${movieId}`));
            }

        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };
    const getShowFavourites = async (request, response, next) => {
        try {
            const id = request.params.id;
            const favourites = await accountService.getShowFavourites(id, dependencies);
            response.status(200).json(favourites);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    const addMustWatch = async (request, response, next) => {
        try {
            const { movieId } = request.body;
            const id = request.params.id;
            try{
                const account = await accountService.addMustWatch(id, movieId, dependencies);
                response.status(200).json(account);
            }catch (err ){
                // response.status(500).json(`Duplicate Favourite ${movieId}`);
                next(new Error(`Duplicate Favourite ${movieId}`));
            }

        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };
    const getMustWatch = async (request, response, next) => {
        try {
            const id = request.params.id;
            const favourites = await accountService.getMustWatch(id, dependencies);
            response.status(200).json(favourites);
        } catch (err) {
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    return {
        createAccount,
        getAccount,
        listAccounts,
        updateAccount,
        authenticateAccount,
        verify,
        addMovieFavourite,
        addMustWatch,
        addPersonFavourite,
        addShowFavourite,
        getMovieFavourites,
        getMustWatch,
        getPersonFavourites,
        getShowFavourites
    };
};
