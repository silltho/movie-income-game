// Modules
import $ from 'jquery';
import page from 'page';
import game from './game';
import Handlebars from 'hbsfy/runtime';
import sparql from './sparql';

// testing
fetch(sparql.buildMoviesQuery()).then(res => res.json()).then(sparql.parseMovies).then(console.log);

// Templates
import homeTpl from './templates/home.hbs';
import gameSidePtl from './templates/gameSide.partial.hbs';
// import notFoundTpl from './templates/notFound.hbs';


game.init();

// Partials
Handlebars.registerPartial('gameSidePtl', gameSidePtl);

// Variables
const $app = $('#app');
const dummyObj = {
    name: "Patrick",
    surname: "Obermueller"
};

// Functions
function render(tpl, data) {
    $app.html(tpl(data));
}

// Routing
page('/', render(homeTpl, dummyObj));
page();
