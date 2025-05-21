const quoteTextElement = document.getElementById('quote');
const quoteAuthorElement = document.getElementById('author');
const newQuoteButton = document.getElementById('generate-button');

const quoteApiUrl = 'https://go-quote.azurewebsites.net/api/quote';

async function fetchAndDisplayQuote() {
    console.log('Fetching a new quote...');

    quoteTextElement.innerHTML = '"Fetching new quote..."';
    quoteAuthorElement.innerHTML = '...'
    newQuoteButton.disabled = true;

    try {
        const response = await fetch(quoteApiUrl);

        if(!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const quoteData = await response.json();
        console.log("Quote data received:", quoteData);

        quoteTextElement.innerHTML = `"${quoteData.text}"`;
        quoteAuthorElement.innerHTML = `- ${quoteData.author}`;
        console.log(quoteData);
    } catch(error) {
        console.error("Could not fetch quote:", error);
        quoteTextElement.innerHTML = `"Oops! Could not fetch quote! Please try again when you have a real internet connection."`;
        quoteAuthorElement.innerHTML = "- Shakespeare";
    } finally {
        newQuoteButton.disabled = false;
    }
}

newQuoteButton.addEventListener('click', fetchAndDisplayQuote);