/* eslint-disable no-undef */
import axios from 'axios';

export default {

    getPopularPersons: async (page)=>{
      const response = await axios.get(
        `https://api.themoviedb.org/3//person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
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

  };
