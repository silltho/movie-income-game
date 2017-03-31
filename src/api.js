import $ from 'jquery';
import sparql from './sparql';

export default {
  load(url) {
    return window.fetch(url)
      .then((res) => res.json());
  },

  loadMovies() {
    return this.load(sparql.buildMoviesQuery())
      .then((res) => {
        return sparql.parseMovies(res);
      });
  }
};
