/* eslint-disable no-unused-vars */
import showsService from "./../services/index.js";
import logger from "../../utils/Logger.js";
export default (dependencies) => {


    const getPopularTVShows = async (request, response, next) => {
        logger.log("info", `Retrieving Popular TV Shows`);
        const page = request.query.page;
        const movies = await showsService.getPopularTVShows(page, dependencies);
        response.status(200).json(movies);
    };

    const getShow = async (request, response, next) => {
        const id = request.params.id;
        logger.log("info", `Retrieving TV Show ${id}`);
        const movies = await showsService.getShow(id, dependencies);
        response.status(200).json(movies);
    };

    const getShowImages = async (request, response, next) => {
        const id = request.params.id;
        logger.log("info", `Retrieving images for TV Show ${id}`);
        const movies = await showsService.getShowImages(id, dependencies);
        response.status(200).json(movies);
    };


    return {
        getPopularTVShows,
        getShow,
        getShowImages,
    };
};
