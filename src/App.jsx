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
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const jsonData = await fakeSearch();
      // const jsonData = await searchImages('cat', 10, 2);
      setData(jsonData);
    };
    getData();
  }, []);

  useEffect(() => {
    // console.log('Effect: ', data);
    if (Object.keys(data).length > 0) {
      setTotalPages(data.total_pages);
      if (data.results) {
        const newImages = data.results.map((image) => {
          return {
            alt: image.alt_description,
            blurHash: image.blur_hash,
            color: image.color,
            small: image.urls.small,
            regular: image.urls.regular,
            id: image.id,
          };
        });
        setImages(newImages);
        // setImages((prev) => {
        //   return [...prev, ...newImages];
        // });
      }
    }
  }, [data]);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(false);
      setData({});
      const jsonData = await searchImages(query);
      setData(jsonData);
      setCurrentPage(1);
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
      {/* <h1>Gallery</h1> */}
      {images.length > 0 && <ImageGallery images={images} />}
      {data.length > 0 && <h3>Images Data</h3>}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {currentPage < totalPages && !error && <LoadMoreBtn />}
    </div>
  );
}

export default App;
