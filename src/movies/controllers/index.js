/* eslint-disable no-unused-vars */
import moviesService from "./../services/index.js";
import logger
 from "../../utils/Logger.js";
export default (dependencies) => {

    const getMovie = async (request, response, next) => {
        //input
        const movieId = request.params.id;
        // Treatment
        logger.log("info", `Retrieving movie ${movieId}`);

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
        logger.log("info", "Retrieving upcoming movies");
        const movies = await moviesService.findUpcoming(dependencies);
        response.status(200).json(movies.results);
    };

    const getPopularMovies = async (request, response, next) => {
        logger.log("info", "Retrieving popular movies");
        const movies = await moviesService.getPopularMovies(dependencies);
        response.status(200).json(movies.results);
    };

    const getMovieVideo = async (request, response, next) => {
        const id = request.params.id;
        logger.log("info", `Retrieving videos for movie ${id}`);
        const movies = await moviesService.getMovieVideo(id, dependencies);
        response.status(200).json(movies.results);
    };

    const getMovieImages = async (request, response, next) => {
        const id = request.params.id;
        logger.log("info", `Retrieving images for movie ${id}`);
        const images = await moviesService.getMovieImages(id, dependencies);
        response.status(200).json(images);
    };

    const getMovieReviews = async (request, response, next) => {
        const id = request.params.id;
        logger.log("info", `Retrieving reviews for movie ${id}`);
        const movies = await moviesService.getMovieReviews(id, dependencies);
        response.status(200).json(movies.results);
    };

    const searchMovie = async (request, response, next) => {
        const query = request.query.query;
        logger.log("info", `Searching for ${query}`);
        console.log(query);
        response.status(200);
        // const movies = await moviesService.searchMovie(query, dependencies);
        // response.status(200).json(movies.results);
    };

    return {
        getMovie,
        find,
        getUpcomingMovies,
        getPopularMovies,
        getMovieVideo,
        getMovieImages,
        getMovieReviews,
        searchMovie
    };
};
