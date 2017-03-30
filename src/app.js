// Modules
import $ from 'jquery';
import page from 'page';
import api from './api';
import Handlebars from 'hbsfy/runtime';

// Templates
import homeTpl from './templates/home.hbs';
import gameSidePtl from './templates/gameSide.partial.hbs';
// import notFoundTpl from './templates/notFound.hbs';


api.loadMovieList();

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
