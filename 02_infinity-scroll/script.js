const loader = document.getElementById('loader');
const imageContainer = document.getElementById('image-container');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 5;
const apiKey = 'nsxXFYjpM72uZTccjTJK5HOarQgYQlQFGh4ny1K8Tkg';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded() {
	imagesLoaded++;
	loader.hidden = true;
	if (imagesLoaded === totalImages) {
		ready = true;
	}
}

function setAttributes(element, attributes) {
	for (const key in attributes) {
		element.setAttribute(key, attributes[key]);
	}
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	// Run function for each object in photosArray
	photosArray.forEach(photo => {
		// Create <a> to link to Unsplash
		const item = document.createElement('a');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});
		// Create <img> for photo
		const img = document.createElement('img');
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});

		img.addEventListener('load', imageLoaded);
		// Put <img> inside <a>, then put both inside imageContainer Element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();
	} catch (error) {
		console.log('Błąd pobierania danych z API!');
	}
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
	if (
		window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
		ready
	) {
		ready = false;
		loader.hidden = false;
		getPhotos();
	}
});

// On Load
getPhotos();
