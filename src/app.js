import game from './game';
import sparql from './sparql';
import * as helpers from './hbsHelper';

// Testing
fetch(sparql.buildMoviesQuery()).then(res => res.json()).then(sparql.parseMovies).then(console.log);

helpers.registerPartials();

game.init();
