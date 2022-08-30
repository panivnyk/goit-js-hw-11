import axios from 'axios';
import Notiflix from 'notiflix';

const baseURL = 'https://pixabay.com/api/?key=';
const API_KEY = '29451964-958278d8f10d2abadadf36c5e';
const searchOption = 'image_type=photo&orientation=horizontal&safesearch=true';

export async function fetchImages(searchQuery, HITS_PER_PAGE, currentPage) {
  try {
    const res = await axios.get(
      `${baseURL}${API_KEY}&q=${searchQuery}&${searchOption}&per_page=${HITS_PER_PAGE}&page=${currentPage}`
    );

    return await res.data;
  } catch (error) {
    Notiflix.Notify.failure(error.message, {
      position: 'center-center',
    });
  }
}
