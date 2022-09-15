// Information to reach API
const url = 'https://api.datamuse.com/words?sl=';
const queryParams = 'rel_jja=';

// Selects page elements
const inputField = document.querySelector('#input');
const submit = document.querySelector('#submit');
const responseField = document.querySelector('#responseField');

// Asynchronous function using Promises and then() syntax
const getSuggestionsI = () => {
    // declare variables
    const wordQuery = inputField.value;
    const endpoint = `${url}${wordQuery}`;
    
    // sending the request to API server with fetch()
    fetch(endpoint, {cache: 'no-cache'})
        // first then() converts response object to JSON
        .then(response => {

            if (response.ok) {
                return response.json();
            }
            
            // handling error if response from API is an error
            throw new Error('Request failed!');

        }, networkError => {
            console.log(networkError.message)
        })

        // second chained then() handles response
        .then(jsonResponse => {
            renderResponse(jsonResponse)
        })
}

// Asynchronous function using async..await and try...catch syntax from ES8 JavaScript version
const getSuggestionsII = async () => {
        // declare variables
        const wordQuery = inputField.value;
        const endpoint = url + queryParams + wordQuery;

        // asynchrounous code with try...catch blocks and async...await syntax
        try {

            // sending the request to API server with fetch()
            const response = await fetch(endpoint, {cache: 'no-cache'});
            
            // handling success
            if (response.ok) {
                const jsonResponse = await response.json();
                renderResponse(jsonResponse);
            }

            // handling response if there is an error with response from API
            throw new Error('Request Failed!')

        //handling response in case promise is unsucessful
        } catch(error) {
            console.log(error);
        }
}


// Clears previous results and display results to webpage
const displaySuggestions = (event) => {
  event.preventDefault();
  while(responseField.firstChild){
    responseField.removeChild(responseField.firstChild);
  }
  getSuggestionsII();
};

submit.addEventListener('click', displaySuggestions);