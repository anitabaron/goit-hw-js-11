import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const APIkey = '44946151-dc02d84f49eea13b7d5c48659';
const url = 'https://pixabay.com/api/';
const searchBtn = document.querySelector('.search');
searchBtn.addEventListener('submit'
preventDefault()

);
const imageContainer = document.querySelector('.gallery');



details = {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  close: true,
  className: 'simpleLightboxGallery',
  doubleTapZoom: 2,
  scrollZoom: true,
  overlay: true,
};


const lightBox = new SimpleLightbox('.gallery a', details);

const options = {
  method: 'GET',
};

fetch('<>', options)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {})
  .catch(error => {});

const message =
  'Sorry, there are no images matching your search query. Please try again!';

iziToast.warning({
  message,
  backgroundColor: '#ef4040',
  messageColor: `#fff`,
});
