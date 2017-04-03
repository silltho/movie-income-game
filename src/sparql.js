/*
 PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

 SELECT DISTINCT ?film_title ?film_runtime ?film_gross ?film_budget
 WHERE {
 ?film_title rdf:type <http://dbpedia.org/ontology/Film> ;
 dbo:runtime ?film_runtime ;
 dbo:gross ?film_gross ;
 dbp:budget ?film_budget .
 } LIMIT 1000 OFFSET 0
 */

import {CONFIG} from './config'

const sparql = (function() {
  const buildMoviesQuery = () => {
    return CONFIG.MOVIES_QUERY;
  }

  const parseValue = (prop) => {
    let value;
    if (prop.type === 'typed-literal') {
      let v = new Number(prop.value);
      value = isNaN(v) ? null : +v;
    } else {
      value = prop.value;
    }

    return value;
  }

  const parseBinding = (binding, props) => {
    let obj = {};
    props.forEach(prop => {
      obj[prop] = parseValue(binding[prop]);
    })
    return obj;
  };

  const parseMovies = data => {
    const props = data && data.head && data.head.vars;

    let result = {};

    if (props && props.length > 0) {
        result.movies = data && data.results && data.results.bindings && data.results.bindings.map(b => parseBinding(b, props));
    }

    return result;
  }

  return {
    buildMoviesQuery,
    parseMovies,
  }
})();

export default Object.freeze(sparql);
