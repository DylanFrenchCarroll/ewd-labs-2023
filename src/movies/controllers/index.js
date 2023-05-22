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
        logger.log("info", `Retrieving discover pages `);
        const page = request.query.page;
        // Treatment
        const movies = await moviesService.find(page, dependencies);
        //output
        response.status(200).json(movies);
    };

    const getUpcomingMovies = async (request, response, next) => {
        logger.log("info", "Retrieving upcoming movies");
        const page = request.query.page;
        const movies = await moviesService.findUpcoming(page, dependencies);
        response.status(200).json(movies);
    };

    const getPopularMovies = async (request, response, next) => {
        logger.log("info", "Retrieving popular movies");
        const movies = await moviesService.getPopularMovies(dependencies);
        response.status(200).json(movies);
    };

    const getMovieVideo = async (request, response, next) => {
        const id = request.params.id;
        logger.log("info", `Retrieving videos for movie ${id}`);
        const movies = await moviesService.getMovieVideo(id, dependencies);
        response.status(200).json(movies);
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
        response.status(200).json(movies);
    };

    const searchMovie = async (request, response, next) => {
        const query = request.query.query;
        logger.log("info", `Searching for ${query}`);
        const movies = await moviesService.searchMovie(query, dependencies);
        response.status(200).json(movies.results);
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
