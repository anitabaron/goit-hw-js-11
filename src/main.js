import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const API_KEY = '44946151-dc02d84f49eea13b7d5c48659';
const BASE_URL = 'https://pixabay.com/api/';
const searchBtn = document.querySelector('.search-btn');
const searchForm = document.querySelector(`.search-form`);
const inputField = document.querySelector(`.input-field`);
const resultsGalleryContainer = document.querySelector(`.gallery-result`);
const imageContainer = document.querySelector('.gallery-result > img');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const request = inputField.value;
  fetchImages(request);
});

function fetchImages(request) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${request}&image_type=photo&orientation=horizontal&safesearch=true`;

  fetch(url)
    .then(res => res.json())
    .then(json => console.log(json))
    .then(data => displayImages(data.hits))
    .catch(error => {
      console.error(error);
    });
}

const Loader = {
  enable: () => document.querySelector('.spinner').classList.remove('disabled'),
  disable: () => document.querySelector('.spinner').classList.add('disabled'),
};

const message =
  'Sorry, there are no images matching your search query. Please try again!';

function displayImages(images) {
  resultsGalleryContainer.innerHTML = '';
  if (images.length === 0) {
    iziToast.warning({
      message,
      backgroundColor: '#ef4040',
      messageColor: `#fff`,
    });
    return;
  }
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    resultsGalleryContainer.appendChild(imgElement);
  });
}

const loadText = document.querySelector('.loading-text');

//najpierw dodać elementy do DOM

const details = {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
  className: 'simpleLightboxGallery',
  doubleTapZoom: 2,
  scrollZoom: true,
  overlay: true,
};

const lightBox = new SimpleLightbox('.gallery-result img', details);

const options = {
  method: 'GET',
};

// fetch('${ url }${ APIkey }', options)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   })
//   .then(data => {})
//   .catch(error => {});

const isSuccess = true;
// Create promise
const promise = new Promise((resolve, reject) => {
  console.log('Loadning images');
  loadText.classList.remove('disabled');
  setTimeout(() => {
    if (isSuccess) {
      resolve('Success! Value passed to resolve function');
    } else {
      reject('Error! Error passed to reject function');
    }
  }, 4000);
});

// Registering promise callbacks
promise
  .then(value => {
    console.log(value); // "Success! Value passed to resolve function"
  })
  .catch(error => {
    console.log(error); // "Error! Error passed to reject function"
  });
