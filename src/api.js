import $ from 'jquery';
import sparql from './sparql';

let url = 'https://dbpedia.org/sparql';
let query = '';
let format = 'json';


export default {
    movieList: [],

    load(url) {
        return window.fetch(url)
            .then((res) => res.json());
    },

    loadMovieList() {
        
    },

    getRandomMovie(movieId) {
        // if idx is the same call rnd again
    },

    loadMoviePair(movieAId, movieBId) {

    }
};
