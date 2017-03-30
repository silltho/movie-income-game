import $ from 'jquery';
import sparql from './sparql';

export default {
  movieList: [],

  load(url) {
    return window.fetch(url)
      .then((res) => res.json());
  },

  loadMovieList() {
    return this.load(sparql.queries.buildMoviesQuery())
      .then((res) => {
        this.movieList = sparql.parser.parseMovies(res);
        console.log(this.movieList);
      });
  },

  getRandomMovieId(movieId) {
    let max = this.movieList.length;
    let rndIdx = Math.floor(Math.random() * max);
    let movie = this.movieList[rndIdx];

    // if idx is the same call rnd again
    if (!!movieId && movie.id === movieId) {
      return this.getRandomMovie(movieId);
    }

    return movie.id;
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
