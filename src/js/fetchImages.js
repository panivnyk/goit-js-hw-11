// import axios from 'axios';
// axios.defaults.baseURL = 'https://pixabay.com/api/?key=';
// const API_KEY = '29451964-958278d8f10d2abadadf36c5e';
// const options = 'image_type=photo&orientation=horizontal&safesearch=true';

// const DEFAULT_CURRENT_PAGE = 1;
// const HITS_PER_PAGE = 20;
// let isLoading = false;
// let items = [];
// let query = '';
// let currentPage = DEFAULT_CURRENT_PAGE;
// let totalPages = 0;

// const loaderOn = () => refs.loader.classList.add('visible');
// const loaderOff = () => refs.loader.classList.remove('visible');

// console.log(`?key=${API_KEY}&q=${query}&${options}`);
// const fetchImages = async () => {
//   isLoading = true;
//   loaderOn();

//   try {
//     const { data } = await axios.get(
//       `${API_KEY}&q=${query}&per_page=${HITS_PER_PAGE}&page=${currentPage}`
//     );

//     then;
//     items = [...items, data.hits];
//     totalPages = data.totalHits / HITS_PER_PAGE;
//     renderList(data.hits);
//   } catch (error) {
//     console.log(error.message);
//   }

//   // finally
//   loaderOff();
//   isLoading = false;
// };

// //https://pixabay.com/api/?key=29451964-958278d8f10d2abadadf36c5e&q=yellow+flowers&image_type=photo&pretty=true
// // const query = 'cat';

// // console.log(`${baseURL}?key=${API_KEY}&q=${query}&${options}`);

// // export function fetchImages(query) {
// //   return axios
// //     .get(`${baseURL}?key=${API_KEY}&q=${query}&${options}`)

// //     .then(response => {
// //       if (!response.ok) {
// //         throw new Error(response.status);
// //       }
// //       console.log(`${baseURL}?key=${API_KEY}&q=${query}&${options}`);
// //       return response.json();
// //     });
// // }
