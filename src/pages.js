import mainTpl from './templates/main.hbs';
import gameSideTpl from './templates/gameSide.partial.hbs';

const pages = {
    mainTpl: mainTpl,
    gameSideTpl: gameSideTpl
};

Object.freeze(pages);
export {pages};