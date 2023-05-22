/* eslint-disable no-undef */
import axios from 'axios';

export default {
    getMovie: async (movieId) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_KEY}`
          );
          return response.data;
    },
    find: async (query) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${query}`
          );
          return response.data;
    },
    findUpcoming: async (query)=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${query}`
      );
      return response.data;
    },

    getPopularMovies: async (query)=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=${query}`
      );
      return response.data;
    },

    getMovieVideo: async (id)=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_KEY}`
      );
      return response.data;
    },

    getMovieImages: async (id)=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_KEY}`
      );
      return response.data;
    },

    getMovieReviews: async (id)=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_KEY}`
      );
      return response.data;
    },

    getPopularPersons: async ()=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3//person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
      );
      return response.data;
    },

    getPersonImages: async (id)=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.TMDB_KEY}`
      );
      return response.data;
    },

    getPerson: async (id)=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_KEY}`
      );
      return response.data;
    },

    getPopularTVShows: async ()=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3//tv/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&page=1`
      );
      return response.data;
    },

    getShow: async (id)=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.TMDB_KEY}`
      );
      return response.data;
    },

    getShowImages: async (id)=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/images?api_key=${process.env.TMDB_KEY}`
      );
      return response.data;
    },

    searchMovie: async (query)=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${query}`
      );
      return response.data;
    },


  };
