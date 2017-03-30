import api from './api';
// import mainTpl from './templates/main';

export default {
  init() {
    this.$el = $('#main');

    this.moviePair = {};

    api.loadMovies()
      .then(() => this.createMoviePair())
      .then((data) => {
        this.moviePair = data;
        this.render(data)
      });
  },

  render(data) {
    this.$el.html(mainTpl(data));
  },

  postRender() {
    this.$el.on('click', '#movie-a', this.movieAClickHandler.bind(this));
    this.$el.on('click', '#movie-b', this.movieBClickHandler.bind(this));
  },

  createMoviePair() {
    let movieAId = api.getRandomMovieId();
    let movieBId = api.getRandomMovieId(movieAId);

    return api.loadMoviePair(movieAId, movieBId);
  },

  movieAClickHandler() {
    
  },

  movieBClickHandler() {

  }
}
