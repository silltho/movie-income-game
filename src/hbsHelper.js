import Handlebars from 'hbsfy/runtime'
import {pages} from './pages'

export function registerHelpers() {
    // code here
}

export function registerPartials() {
    Handlebars.registerPartial('gameSidePtl', pages.gameSideTpl);
}