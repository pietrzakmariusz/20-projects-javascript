const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
	loader.style.display = 'block';
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	if (loader.style.display === 'block') {
		loader.style.display = 'none';
		quoteContainer.hidden = false;
	}
}

function showQuote() {}

// Get Quote from API
async function getQuote() {
	const URL = 'https://type.fit/api/quotes';
	showLoadingSpinner();

	try {
		const response = await fetch(URL);
		const responseData = await response.json();

		const quote = responseData[Math.floor(Math.random() * responseData.length)];

		quote.text.length > 120
			? quoteText.classList.add('long-quote')
			: quoteText.classList.remove('long-quote');
		quoteText.textContent = quote.text;

		quote.author
			? (author.textContent = quote.author)
			: (author.textContent = 'Unknown');
		removeLoadingSpinner();
	} catch (error) {
		console.log('Error, no quote', error);
	}
}

function tweetQuote() {
	const quote = quoteText.textContent;
	const author = quoteAuthor.textContent;
	const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterURL, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);

getQuote();

/* old function
async function getQuote() {
	const URL = 'http://quotes.stormconsultancy.co.uk/random.json';
	showLoadingSpinner();

	try {
		const response = await fetch(URL);
		const data = await response.json();

		data.quote.length > 120
			? quoteText.classList.add('long-quote')
			: quoteText.classList.remove('long-quote');
		quoteText.innerText = data.quote;

		data.author
			? (author.innerText = data.author)
			: (author.innerText = 'Unknown');
		removeLoadingSpinner();
	} catch (error) {
		console.log('Error, no quote', error);
	}
}
*/
