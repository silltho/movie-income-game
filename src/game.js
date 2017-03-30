import api from './api';
// import mainTpl from './templates/main';

export default {
    init() {
        this.$el = $('#main');
    },

    render() {
        this.$el.html(mainTpl(data));
    },

    postRender() {
        this.$el.on('click', '#movie-a', this.movieAClickHandler.bind(this));
        this.$el.on('click', '#movie-b', this.movieBClickHandler.bind(this));
    },

    movieAClickHandler() {

    },

    movieBClickHandler() {
        
    }
}
