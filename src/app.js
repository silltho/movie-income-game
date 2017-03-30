import $ from 'jquery';
import page from 'page';
import api from './api';

// Templates
// import homeTpl from './templates/home.hbs';

api.loadMovieList();

page('/', home);
page();
