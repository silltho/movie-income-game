// funtion: getAllMovies
// function: getMovieById


const sparql = (function() {

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

  const baseUrl = 'http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=';
  const moviesQuery = 'http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=PREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0A%0D%0ASELECT+DISTINCT+%3Fid+%3Fruntime+%3Fgross+%3Fbudget+%3Fname%0D%0AWHERE+%7B%0D%0A%3Fid+rdf%3Atype+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2FFilm%3E+%3B%0D%0A+++dbo%3Aruntime+%3Fruntime+%3B%0D%0A+++dbo%3Agross+%3Fgross+%3B%0D%0A+++dbp%3Abudget+%3Fbudget+%3B%0D%0A+++dbp%3Aname+%3Fname%0D%0A%7D+LIMIT+1000+OFFSET+0&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=30&debug=on'

  const buildMoviesQuery = () => moviesQuery;

  const parseMovies = data => {
    const props = data && data.head && data.head.vars;

    let result = {};

    if (props && props.length > 0) {
        result.movies = data && data.results && data.results.bindings && data.results.bindings.map(binding => {
          let obj = {};
          props.forEach(prop => {
            obj[prop] = binding[prop].value;
          })
          return obj;
        });
    }

    return result;
  }

  const parseMovie = data => {

  }

  return {
    queries: {
      buildMoviesQuery,
    },
    parser: {
      parseMovies,
    },
    baseUrl,
  }
})();

export default Object.freeze(sparql);
