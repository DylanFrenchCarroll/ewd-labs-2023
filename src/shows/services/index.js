/* eslint-disable no-undef */
import axios from 'axios';

export default {

    getPopularTVShows: async (page)=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3//tv/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
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


  };
