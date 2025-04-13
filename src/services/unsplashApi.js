import photos from '../photos.json';
import photosQuery from '../photos_query.json';

const API = {
  BASE: 'https://api.unsplash.com/',
  SEARCH: 'search/photos',
  HEADERS: ['Accept-Version: v1', 'Authorization: Client-ID YOUR_ACCESS_KEY'],
  ACCESS_KEY: 'Vi2cAjvUvW27MVDBGg5H1AuSeD0n18wgJJaMXF67vcI',
};

export const searchImages = async (query, page = 1, per_page = 12) => {
  const params = new URLSearchParams({
    query,
    client_id: API.ACCESS_KEY,
    per_page,
    page,
  });
  const searchUrl = `${API.BASE}${API.SEARCH}?${params.toString()}`;
  const response = await fetch(searchUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const fakeSearch = async (query, per_page = 12, page = 1) => {
  return photosQuery;
};
