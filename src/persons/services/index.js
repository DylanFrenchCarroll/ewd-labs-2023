/* eslint-disable no-undef */
import axios from 'axios';

export default {

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

  };
