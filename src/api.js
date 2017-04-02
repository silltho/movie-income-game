import config from './config';
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
  },

  loadMovieImage(movie){
    return this.load(config.MOVIES_IMAGES_URL + movie).then(response => response.Poster)
  }
};
