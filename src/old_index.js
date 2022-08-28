form.addEventListener('submit', async event => {
  try {
    event.preventDefault();
    const { searchBtn, searchQuery } = event.currentTarget;
    page = 1;
    let trimInput = searchQuery.value.trim();
    if (trimInput === '') {
      return;
    }
    localStorage.setItem('inputValue', `${trimInput}`);
    gallery.innerHTML = '';
    const varPhotos = await fetchPhotos(trimInput, page);
    const photosArr = varPhotos.hits;
    const total = varPhotos.totalHits;
    if (total > 0) {
      Notiflix.Notify.success(`Hooray! We found ${total} images.`);
    }
    if (photosArr.length === 0) {
      throw new Error();
    }
    renderGallery(photosArr);
    lightbox.refresh();
  } catch (error) {
    gallery.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
});

import Notiflix from 'notiflix';
import axios from 'axios';
// import { fetchImages } from './js/fetchImages.js';

const baseURL = 'https://pixabay.com/api/?key=';
const API_KEY = '29451964-958278d8f10d2abadadf36c5e';
const options = 'image_type=photo&orientation=horizontal&safesearch=true';

const loaderOn = () => refs.loader.classList.add('visible');
const loaderOff = () => refs.loader.classList.remove('visible');

const DEFAULT_CURRENT_PAGE = 1;
const HITS_PER_PAGE = 40;
let isLoading = false;
let items = [];
// let query = '';
let currentPage = DEFAULT_CURRENT_PAGE;
let totalPages = 0;

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  // pages: document.querySelector('.pages'),
  loadMore: document.querySelector('.load-more'),
};

const renderList = items => {
  const list = items
    // .map(({ title, url }) => `<li><a href="${url}">${title}</a></li>`)
    .map(
      ({ previewURL, pageURL }) =>
        `<li><a href="${pageURL}"><img src="${previewURL}" /></a></li>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', list);
};

console.log(
  `${baseURL}${API_KEY}&q=${query}&${options}&per_page=${HITS_PER_PAGE}&page=${currentPage}`
);

const fetchImages = async () => {
  isLoading = true;
  loaderOn();

  try {
    const { data } = await axios.get(
      `${baseURL}${API_KEY}&q=${query}&${options}&per_page=${HITS_PER_PAGE}&page=${currentPage}`
    );

    items = [...items, data.hits];
    totalPages = data.totalHits / HITS_PER_PAGE;
    renderList(data.hits);
  } catch (error) {
    console.log(error.message);
  }

  loaderOff();
  isLoading = false;
};

const handleSubmit = event => {
  event.preventDefault();

  // if (query === event.target.elements.query.value) return;

  query = event.currentTarget;
  refs.gallery.innerHTML = '';
  currentPage = DEFAULT_CURRENT_PAGE;
  items = [];

  if (!query) return;

  fetchImages();
};

const handleLoadMoreClick = () => {
  currentPage += 1;
  fetchImages();
};

refs.searchForm.addEventListener('submit', handleSubmit);
refs.loadMore.addEventListener('click', handleLoadMoreClick);

// const renderImages = image => {
//   const result = image
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments ${comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads${downloads}</b>
//     </p>
//   </div>
// </div>`;
//       }
//     )
//     .join('');
//   gallery.insertAdjacentHTML('beforeend', result);
// };

// // webformatURL - ссылка на маленькое изображение для списка карточек.
// // largeImageURL - ссылка на большое изображение.
// // tags - строка с описанием изображения. Подойдет для атрибута alt.
// // likes - количество лайков.
// // views - количество просмотров.
// // comments - количество комментариев.
// // downloads - количество загрузок.
