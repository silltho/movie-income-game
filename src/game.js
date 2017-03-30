import $ from 'jquery';
import api from './api';
// import mainTpl from './templates/main';

const COMPARISON_PROPS = ['budget', 'gross'];

export default {
  init() {
    this.$el = $('#main');

    this.moviePair = {};

    api.loadMovies()
      .then((data) => this.getRandomMoviePair(data.movies))
      .then((data) => {
        this.moviePair = data;
        this.render(data)
      });
  },

  render(data) {
    // this.$el.html(mainTpl(data));
  },

  postRender() {
    this.$el.on('click', '#movie-a', this.movieAClickHandler.bind(this));
    this.$el.on('click', '#movie-b', this.movieBClickHandler.bind(this));
  },

  getRandomMoviePair(movies) {
    let movieA = this.getRandomMovie(movies);
    let movieB = this.getRandomMovie(movies, movieA);

    this.setComparisonProp(movieA, movieB); 

    console.log(movieA, movieB);

    return { movieA, movieB };
  },

  // if idx is the same call rnd again
  getRandomMovie(movies, excludedMovie) {
    let max = movies.length;
    let rndIdx = Math.floor(Math.random() * max);
    let movie = movies[rndIdx];

    if (!!excludedMovie && excludedMovie.id === movie.id) {
      return this.getRandomMovie(movies, excludedMovie);
    }

    return movie;
  },

  setComparisonProp(...movies) {
    let rndIdx = Math.floor(Math.random() * COMPARISON_PROPS.length);
    let comparisonProp = COMPARISON_PROPS[rndIdx];

    for (let movie of movies) {
      movie.comparisonProp = comparisonProp;
    }
  },

  isHigher(choosen, other) {
    let comparisonProp = choosen.comparisonProp;

    return choosen[comparisonProp] > other[comparisonProp];
  },

  movieAClickHandler() {
    let movieA = this.moviePair.movieA;
    let movieB = this.moviePair.movieB;

    if (this.isHigher(movieA, movieB)) {
      // right
    } else {
      // wrong
    }
  },

  movieBClickHandler() {
    let movieA = this.moviePair.movieA;
    let movieB = this.moviePair.movieB;

    if (this.isHigher(movieB, movieA)) {
      // right
    } else {
      // wrong
    }
  }
}
