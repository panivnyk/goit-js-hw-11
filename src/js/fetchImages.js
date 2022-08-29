const baseURL = 'https://pixabay.com/api/?key=';
const API_KEY = '29451964-958278d8f10d2abadadf36c5e';
const searchOption = 'image_type=photo&orientation=horizontal&safesearch=true';
const HITS_PER_PAGE = 40;

const fetchImages = async (searchQuery, currentPage) => {
  const { data } = await axios.get(
    `${baseURL}${API_KEY}&q=${searchQuery}&${searchOption}&per_page=${HITS_PER_PAGE}&page=${currentPage}`
  );
  items = await [...items, data.hits];

  //   renderList(data.hits);
};
export default { fetchImages };
