/* eslint-disable no-unused-vars */
import showsService from "./../services/index.js";
export default (dependencies) => {


    const getPopularTVShows = async (request, response, next) => {
        const movies = await showsService.getPopularTVShows(dependencies);
        response.status(200).json(movies.results);
    };

    const getShow = async (request, response, next) => {
        const id = request.params.id;
        const movies = await showsService.getShow(id, dependencies);
        response.status(200).json(movies.results);
    };

    const getShowImages = async (request, response, next) => {
        const id = request.params.id;
        const movies = await showsService.getShowImages(id, dependencies);
        response.status(200).json(movies.results);
    };


    return {
        getPopularTVShows,
        getShow,
        getShowImages,
    };
};
