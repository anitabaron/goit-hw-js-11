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
const resultsGalleryList = document.querySelector(`.gallery-result-list`);
const loadText = document.querySelector('.loading-text');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const request = inputField.value;
  fetchImages(request);
});

function fetchImages(request) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    request
  )}&image_type=photo&orientation=horizontal&safesearch=true`;

  Loader.enable();
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      Loader.disable();
      if (data.hits) {
        displayImages(data.hits);
      } else {
        iziToast.warning({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          backgroundColor: '#ef4040',
          messageColor: '#fff',
        });
      }
    })
    .catch(error => {
      Loader.disable();
      console.error(error);
      iziToast.warning({
        title: 'Error',
        message: 'An error occurred while fetching images',
      });
    });
}

const message =
  'Sorry, there are no images matching your search query. Please try again!';

function displayImages(images) {
  resultsGalleryList.innerHTML = '';
  if (images.length === 0) {
    iziToast.warning({
      message: message,
      backgroundColor: '#ef4040',
      messageColor: `#fff`,
    });
    return;
  }
  const imagesMarkup = images.map(makeImgItem).join('');
  resultsGalleryList.insertAdjacentHTML('beforeend', imagesMarkup);
}

function makeImgItem({
  webformatURL,
  tags,
  downloads,
  likes,
  comments,
  views,
}) {
  return `<li class="list-container">
    <div class="image-container">
      <img src="${webformatURL}" alt="${tags}" />
      <div class="descr-element">
        <p>"views ${views} dowmloads ${downloads} likes ${likes} comments ${comments}"</p>
      </div>
    </div>
  </li>`;
}

// galleryList.addEventListener('click', onImgClick);

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

const lightBox = new SimpleLightbox(
  '.gallery-result-list ul li div img',
  details
);

const Loader = {
  enable: () => document.querySelector('.spinner').classList.remove('disabled'),
  disable: () => document.querySelector('.spinner').classList.add('disabled'),
};

const options = {
  method: 'GET',
};
