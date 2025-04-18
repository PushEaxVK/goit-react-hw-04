import { useEffect, useState } from 'react';
import css from './App.module.css';
import { searchImages, fakeSearch } from './services/unsplashApi';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [query, setQuery] = useState('');
  const [modalUrl, setModalUrl] = useState('');
  
  useEffect(() => {
    const loadImages = async () => {
      try {
        if (!query) return;
        setLoading(true);
        setError(false);
        console.log(query, currentPage, totalPages);
        console.log(images);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadImages();
    
  }, [query, currentPage]);

  function handleQuery(query) {
    setImages([]);
    setCurrentPage(0);
    setQuery(query);
  }
  
  
  /* const handleSearch = async (query, page) => {
    setCurrentPage(page);
    if (page === 1) {
      setImages(() => {
        return [];
      });
    }
    try {
      setLoading(true);
      setError(false);
      const jsonData = await searchImages(query, page);
      if (
        Object.keys(jsonData).length === 0 ||
        !jsonData.results ||
        jsonData.results.length === 0
      ) {
        toast.error('No results!');
        setTotalPages(page);
        return;
      }
      if (page === 1 && jsonData.total_pages) {
        setTotalPages(jsonData.total_pages);
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
      if (page === 1) {
        setImages(newImages);
      } else {
        setImages((prev) => {
          return [...prev, ...newImages];
        });
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };*/

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleQuery} />
      <h2>Query: {query}</h2>
      
      {/*images.length > 0 && !error && (
        <ImageGallery images={images} setModal={setModalUrl} />
      )*/}
      
      {/*loading && <Loader />*/}
      {/*error && <ErrorMessage toast={toast} />*/}
      {/*currentPage < totalPages && !error && !loading && (
        <LoadMoreBtn loadMore={() => handleSearch(query, currentPage + 1)} />
      )*/}
      {/*modalUrl !== '' && (
        <ImageModal modalUrl={modalUrl} setModal={setModalUrl} />
      )*/}
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
