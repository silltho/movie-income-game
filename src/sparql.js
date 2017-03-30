// funtion: getAllMovies
// function: getMovieById


const sparql = (function() {

  const baseUrl = 'http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=';
  const moviesQuery = 'PREFIX+rdfs%3A+<http%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23>%0D%0A%0D%0ASELECT+DISTINCT+%3Ffilm_title+%3Ffilm_runtime+%3Ffilm_gross+%3Ffilm_budget%0D%0AWHERE+%7B%0D%0A%3Ffilm_title+rdf%3Atype+<http%3A%2F%2Fdbpedia.org%2Fontology%2FFilm>+%3B%0D%0A+dbo%3Aruntime+%3Ffilm_runtime+%3B%0D%0A+dbo%3Agross+%3Ffilm_gross+%3B%0D%0A+dbp%3Abudget+%3Ffilm_budget+.%0D%0A%7D+LIMIT+1000+OFFSET+0&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=30000&debug=on'

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
      movieQuery,
    },
    parser: {
      parseMovies
    }
    baseUrl,
  }
})();

export Object.freeze(sparql);
