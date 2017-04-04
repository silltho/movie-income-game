import $ from 'jquery';
import api from './api';
import {CONFIG} from './config';
import {pages} from './pages'

let score = 0;
let movies = [];

let higherLowerGame = {
    init() {
        this.$el = $('#app');
        this.moviePair = {};
        api.loadMovies().then(data => {
            movies = data.movies;
            this.moviePair = getRandomMoviePair(movies)
            appendMovieImages(this.moviePair).then(data => {
                this.$el.html(pages.mainTpl(data));
                this.postRender();
            })
        })
    },

    /*render(data) {
        this.appendMovieImages(data).then(data => {
            this.$el.html(pages.mainTpl(data));
            this.postRender();
        })
    },*/

    postRender() {
        this.$el.on('click', '#movie-a', this.movieAClickHandler.bind(this));
        this.$el.on('click', '#movie-b', this.movieBClickHandler.bind(this));
    },

    movieAClickHandler() {
        handleComparison(this.moviePair.movieA, this.moviePair.movieB)
    },
    movieBClickHandler() {
        handleComparison(this.moviePair.movieB, this.moviePair.movieA)
    },

    reload() {
        api.loadMovies().then(data => {
            movies = data.movies;
            this.moviePair = getRandomMoviePair(movies)
            appendMovieImages(this.moviePair).then(data => {
                this.$el.html(pages.mainTpl(data));
                renderScore();
            })
        })
    }
}

export default higherLowerGame

//---------------------private functions---------------------

function handleComparison(movieA, movieB){
    if (isHigher(movieA, movieB)) {
        handleRightAnswer();
    } else {
        handleWrongAnswer();
    }
}

function renderScore() {
    $('#score-counter').html(score);
}

function handleRightAnswer() {
    score += 1;
    alert('Right!');
    higherLowerGame.reload();
}

function handleWrongAnswer() {
    score -= 1;
    alert('Wrong!');
    higherLowerGame.reload();
}

// if idx is the same call rnd again
function getRandomMovie(movies, excludedMovie) {
    let max = movies.length;
    let rndIdx = Math.floor(Math.random() * max);
    let movie = movies[rndIdx];

    if (!!excludedMovie && excludedMovie.id === movie.id) {
        return getRandomMovie(movies, excludedMovie);
    }

    return movie;
}

function getRandomMoviePair(movies) {
    let movieA = getRandomMovie(movies);
    let movieB = getRandomMovie(movies, movieA);

    setComparisonProp(movieA, movieB);

    return {movieA, movieB};
}

function setComparisonProp(...movies) {
    let rndIdx = Math.floor(Math.random() * CONFIG.COMPARISON_PROPS.length);
    let comparisonProp = CONFIG.COMPARISON_PROPS[rndIdx];

    for (let movie of movies) {
        movie.comparisonProp = comparisonProp;
    }
}

function isHigher(chosen, other) {
    let comparisonProp = chosen.comparisonProp;
    console.log("Chosen: " + chosen[comparisonProp]);
    console.log("Other: " + other[comparisonProp]);

    return chosen[comparisonProp] > other[comparisonProp];
}

function appendMovieImages(data) {
    let promises = [];
    promises.push(api.loadMovieImage(data.movieA.name))
    promises.push(api.loadMovieImage(data.movieB.name))

    return Promise.all(promises).then(res => {
        data.movieA.image = res[0]
        data.movieB.image = res[1]
        return data
    })
}