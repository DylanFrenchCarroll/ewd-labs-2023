/* eslint-disable no-unused-vars */
import moviesService from "./../services/index.js";
export default (dependencies) => {

    const getMovie = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        const movie = await moviesService.getMovie(movieId, dependencies);
        //output
        response.status(200).json(movie);
    };
    const find = async (request, response, next) => {
        //input
        const query = request.query;
        // Treatment
        const movies = await moviesService.find(query, dependencies);
        //output
        response.status(200).json(movies);
    };
    const getUpcomingMovies = async (request, response, next) => {
        const movies = await moviesService.findUpcoming(dependencies);
        response.status(200).json(movies.results);
    };

    return {
        getMovie,
        find,
        getUpcomingMovies
    };
};
