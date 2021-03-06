const CONFIG = {
    MOVIES_QUERY: 'http://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=PREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0A%0D%0ASELECT+DISTINCT+%3Fid+%3Fruntime+%3Fgross+%3Fbudget+%3Fname%0D%0AWHERE+%7B%0D%0A%3Fid+rdf%3Atype+%3Chttp%3A%2F%2Fdbpedia.org%2Fontology%2FFilm%3E+%3B%0D%0A+++dbo%3Aruntime+%3Fruntime+%3B%0D%0A+++dbo%3Agross+%3Fgross+%3B%0D%0A+++dbp%3Abudget+%3Fbudget+%3B%0D%0A+++dbp%3Aname+%3Fname%0D%0A%7D+LIMIT+1000+OFFSET+0&format=application%2Fsparql-results%2Bjson&CXML_redir_for_subjs=121&CXML_redir_for_hrefs=&timeout=30&debug=on',
    MOVIES_IMAGES_URL: 'http://www.omdbapi.com/?t=',
    COMPARISON_PROPS: ['budget', 'gross']
}

Object.freeze(CONFIG);
export {CONFIG};