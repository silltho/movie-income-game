import $ from 'jquery';
import page from 'page';

// Templates
// import homeTpl from './templates/home.hbs';

function render(tpl, data) {
    let $main = $('#main');

    $main.html(tpl(data));
}


page('/', home);
page();
