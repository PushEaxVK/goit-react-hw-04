import { useEffect, useState } from 'react';
import css from './App.module.css';
import { searchImages, fakeSearch } from './unsplashApi';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const jsonData = await fakeSearch();
      // const jsonData = await searchImages('cat', 10, 2);
      setData(jsonData);
    };
    getData();
  }, []);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(false);
      setData({});
      const jsonData = await searchImages(query);
      setData(jsonData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      <h1>Gallery</h1>
      {data.length > 0 && <h3>Images Data</h3>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
