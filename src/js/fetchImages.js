import axios from 'axios';
const baseURL = 'https://pixabay.com/api/';
const API_KEY = '29451964-958278d8f10d2abadadf36c5e';
const options = 'image_type=photo&orientation=horizontal&safesearch=true';

//https://pixabay.com/api/?key=29451964-958278d8f10d2abadadf36c5e&q=yellow+flowers&image_type=photo&pretty=true
// const name = 'cat';

// console.log(`${baseURL}?key=${API_KEY}&q=${name}&${options}`);

export function fetchImages(query) {
  return await axios.get(`${baseURL}?key=${API_KEY}&q=${query}&${options}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}
