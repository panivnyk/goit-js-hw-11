import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  buttonForm: document.querySelector('.button-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBlock: document.querySelector('.load-more-block'),
};

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
const baseURL = 'https://pixabay.com/api/?key=';
const API_KEY = '29451964-958278d8f10d2abadadf36c5e';
const searchOption = 'image_type=photo&orientation=horizontal&safesearch=true';
const DEFAULT_CURRENT_PAGE = 1;
const HITS_PER_PAGE = 40;
let currentPage = DEFAULT_CURRENT_PAGE;
let items = [];
let searchQuery = '';
let totalPages = 0;

const renderList = items => {
  //   refs.loadMore.style.display = 'none';
  return (list = items
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
            <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b> ${likes}
                </p>
                <p class="info-item">
                    <b>Views</b> ${views}
                </p>
                <p class="info-item">
                    <b>Comments</b> ${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b> ${downloads}
                </p>
            </div>
        </div>
        `
    )
    .join(''));
  // refs.gallery.insertAdjacentHTML('beforeend', list);
  // loadMoreHide(data.hits.length);
};

const fetchData = async (searchQuery, currentPage) => {
  const { data } = await axios.get(
    `${baseURL}${API_KEY}&q=${searchQuery}&${searchOption}&per_page=${HITS_PER_PAGE}&page=${currentPage}`
  );
  items = await [...items, data.hits];
  //   totalPages = data.totalHits / HITS_PER_PAGE;
  renderList(data.hits);

  if (data.totalHits > 0) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`, {
      position: 'center-center',
    });
  }
  if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      {
        position: 'center-center',
      }
    );
    return;
  }
  refs.gallery.insertAdjacentHTML('beforeend', list);
  lightBox.refresh();
  createBtnLoadMore();
  document
    .querySelector('.load-more-present')
    .addEventListener('click', loadMoreClick);
};

function createBtnLoadMore() {
  if (!document.querySelector('.load-more-present')) {
    const loadMoreBtn = document.createElement('button');
    loadMoreBtn.classList.add('load-more', 'load-more-present');
    refs.loadMoreBlock.append(loadMoreBtn);
    loadMoreBtn.textContent = 'Load more';
  }
}

const handleSubmit = event => {
  event.preventDefault();
  if (searchQuery === event.target.elements.searchQuery.value) return;
  searchQuery = event.target.elements.searchQuery.value;
  refs.gallery.innerHTML = '';
  currentPage = DEFAULT_CURRENT_PAGE;
  items = [];

  if (!searchQuery) return;

  fetchData(searchQuery, currentPage);
};

const loadMoreClick = () => {
  currentPage += 1;
  fetchData(searchQuery, currentPage);
  console.log(currentPage);
};

// function loadMoreHide(hitsValue) {
//   if (hitsValue === 0) {
//     refs.loadMore.style.display = 'none';
//   } else {
//     refs.loadMore.style.display = 'block';
//   }
// }

refs.form.addEventListener('submit', handleSubmit);
// refs.loadMore.addEventListener('click', loadMoreClick);
