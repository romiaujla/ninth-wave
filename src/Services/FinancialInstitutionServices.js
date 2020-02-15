import config from '../config';
const postHeaders = {
    "Authorization" : "not-currently-required",
    "AppId" : "not-currently-required",
    "Content-Type" : "application/json",
}

const getHeader = {
    "Authorization" : "{{tokenString}}",
    "AppId" : "{{appId}}",
    "Content-Type" : "application/json",
}

const FinancialInstitutionServices = {
    getSuggestions(term){
        return fetch(`${config.baseUrl}/suggestion`, {
            method: 'POST',
            headers: postHeaders,
            body: JSON.stringify({
                "query": term,
                "limit": 15,
            })
        })
        .then((res) => res.json())
        .then(suggestions => suggestions)
        .catch(err => {
            console.log(err);
        });
    },
    getSearchResults(term){
        console.log(`\nrun get search results`);
        return fetch(`${config.baseUrl}/search?q=${term}`, {
            method: 'POST',
            headers: postHeaders,
        })
        .then((res) => res.json())
        .then(searchResults => {
            console.log(searchResults);
            return searchResults
        })
        .catch(err => {
            console.log(err);
        });
    },
    getProfileFromFiID(fiId){
        return fetch(`${config.baseUrl}/fiprofile?id=${fiId}`,{
            method: 'GET',
            headers: getHeader,
        })
        .then((res) => res.json())
        .then(fi => fi)
        .catch(err => console.log(err));
    },
}

export default FinancialInstitutionServices;