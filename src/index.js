import Notiflix from 'notiflix';
import axios from 'axios';
import { fetchImages } from './js/fetchImages.js';

// const DEBOUNCE_DELAY = 300;
const inputForm = document.querySelector('.input-form');
const buttonForm = document.querySelector('.button-form');
const gallery = document.querySelector('.gallery');

const DEFAULT_CURRENT_PAGE = 1;
const HITS_PER_PAGE = 40;

let isLoading = false;
let items = [];
let query = '';
let currentPage = DEFAULT_CURRENT_PAGE;
let totalPages = 0;

// webformatURL - ссылка на маленькое изображение для списка карточек.
// largeImageURL - ссылка на большое изображение.
// tags - строка с описанием изображения. Подойдет для атрибута alt.
// likes - количество лайков.
// views - количество просмотров.
// comments - количество комментариев.
// downloads - количество загрузок.

/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div> */

// const searchImages = event => {
//   const findImages = event.target.value.trim();
//    event.preventDefault();

//   if (query === event.target.elements.query.value) return;

//   if (searchImages !== '') {
//       fetchImages(findImages)
//           .then (images => {
//               clearResult();
//               renderCountries(images);
//           };
//       })
//       .catch(error => {
//         clearResult();
//         Notiflix.Notify.failure(
//           'Sorry, there are no images matching your search query. Please try again.',
//           {
//             position: 'center-top',
//           }
//         );

//         return error;
//       });
//   }
// };

buttonForm.addEventListener('submit', searchImages);
