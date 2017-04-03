import $ from 'jquery';
import api from './api';
import {pages} from './pages'

const COMPARISON_PROPS = ['budget', 'gross'];
let score = 0;

export default {
    init() {
        this.$el = $('#app');
        this.allMovies = {};
        this.moviePair = {};

        api.loadMovies()
            .then((data) =>  {
                this.allMovies = this.getRandomMoviePair(data.movies);
                return this.allMovies;
            })
            .then((data) => {
                this.moviePair = data;
                this.render(data)
            });
    },

    render(data) {
        let promises = [];
        promises.push(api.loadMovieImage(data.movieA.name))
        promises.push(api.loadMovieImage(data.movieB.name))

        Promise.all(promises).then(res => {
            data.movieA.image = res[0]
            data.movieB.image = res[1]
            this.$el.html(pages.mainTpl(data));
            this.postRender();
        })
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

        return {movieA, movieB};
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

    isHigher(chosen, other) {
        let comparisonProp = chosen.comparisonProp;
        console.log("Chosen: " + chosen[comparisonProp]);
        console.log("Other: " + other[comparisonProp]);

        return chosen[comparisonProp] > other[comparisonProp];
    },

    movieAClickHandler() {
        let movieA = this.moviePair.movieA;
        let movieB = this.moviePair.movieB;

        if (this.isHigher(movieA, movieB)) {
            score += 1;
            this.renderScore();
            console.log("Movie A has a higher value");
        } else {
            score -= 1;
            this.renderScore();
            console.log("Movie B has a higher value");
        }
    },

    renderScore() {
        $('#score-counter').html(score);
    },

    movieBClickHandler() {
        let movieA = this.moviePair.movieA;
        let movieB = this.moviePair.movieB;

        if (this.isHigher(movieB, movieA)) {
            score += 1;
            this.renderScore();
            console.log("Movie B has a higher value.");
        } else {
            score -= 1;
            this.renderScore();
            console.log("Movie A has a higher value.");
        }
    }
}
