import photos from './photos.json';
import photosQuery from './photos_query.json';

const API = {
  BASE_URL: 'https://api.unsplash.com/',
  HEADERS: ['Accept-Version: v1', 'Authorization: Client-ID YOUR_ACCESS_KEY'],
  client_id: 'YOUR_ACCESS_KEY',
  authoizById: 'https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY',
  SEARCH_URL: '/search/photos',
  ACCESS_KEY: 'Vi2cAjvUvW27MVDBGg5H1AuSeD0n18wgJJaMXF67vcI',
};

export const searchImages = async (query, per_page = 12) => {
  const searchUrl = `https://api.unsplash.com/search/photos?query=${query}&client_id=${API.ACCESS_KEY}&per_page=${per_page}`;
  const response = await fetch(searchUrl);
  const data = await response.json();
  return data;
};

export const fakeSearch = async (query, per_page = 12) => {
  return photosQuery;
};
