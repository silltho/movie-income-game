import page from 'page';
import game from './game';
import Handlebars from 'hbsfy/runtime';
import sparql from './sparql';

// Testing
fetch(sparql.buildMoviesQuery()).then(res => res.json()).then(sparql.parseMovies).then(console.log);

// Templates
import homeTpl from './templates/home.hbs';
import gameSidePtl from './templates/gameSide.partial.hbs';

game.init();

// Partials
Handlebars.registerPartial('gameSidePtl', gameSidePtl);

// Functions
function render(tpl, data) {
    $app.html(tpl(data));
}

// Routing
page('/', render(homeTpl, dummyObj));
page();
