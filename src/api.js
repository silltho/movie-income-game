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
        this.load()
        this.movieList = [];
    },

    getRandomMovie(movieId) {
        let max = this.movieList.length;
        let rndIdx = Math.floor(Math.random() * max);
        let movie = this.movieList[rndIdx];

        // if idx is the same call rnd again
        if (!!movieId && movie.id === movieId) {
            return this.getRandomMovie(movieId);
        }

        return movie;
    },

    loadMoviePair(movieAId, movieBId) {
        return Promise.all([
            this.load(sparql.buildMovieQuery(movieAId)),
            this.load(sparql.buildMovieQuery(movieBId))
        ]).then((res) => {
            return {
                movieA: sparql.parseMovie(res[0]),
                movieB: sparql.parseMovie(res[1])
            }
        });
    }
};
