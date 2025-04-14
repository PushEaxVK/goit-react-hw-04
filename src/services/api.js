import axios from 'axios';

export const fetchHits = async () => {
  const response = await axios.get('https://hn.algolia.com/api/v1/search');
  return response.data;
};
