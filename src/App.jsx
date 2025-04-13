import { useEffect, useState } from 'react';
import css from './App.module.css';
import { searchImages, fakeSearch } from './services/unsplashApi';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  // const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState('');

  const handleSearch = async (query, page) => {
    setCurrentPage(page);
    try {
      setLoading(true);
      setError(false);
      // setData({});
      const jsonData = await searchImages(query, page);
      if (Object.keys(jsonData).length === 0) {
        console.log('jsonData is empty!');
        return;
      }
      if (page === 1 && jsonData.total_pages) {
        setTotalPages(jsonData.total_pages);
      }
      if (!jsonData.results || jsonData.results.length === 0) {
        console.log('No results!');
        setTotalPages(page);
        return;
      }
      const newImages = jsonData.results.map((image) => {
        return {
          alt: image.alt_description,
          blurHash: image.blur_hash,
          color: image.color,
          small: image.urls.small,
          regular: image.urls.regular,
          id: image.id,
        };
      });
      console.log(newImages);
      if (page === 1) {
        setImages(newImages);
      } else {
        setImages((prev) => {
          return [...prev, ...newImages];
        });
      }
      // setData(jsonData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    handleSearch(query, currentPage + 1);
  };

  return (
    <div className={css.app}>
      <SearchBar
        onSubmit={(searchQuery) => {
          handleSearch(searchQuery, 1);
          setQuery(searchQuery);
        }}
      />
      {images.length > 0 && <ImageGallery images={images} />}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {currentPage < totalPages && !error && !loading && (
        <LoadMoreBtn loadMore={() => handleSearch(query, currentPage + 1)} />
      )}
    </div>
  );
}

export default App;
