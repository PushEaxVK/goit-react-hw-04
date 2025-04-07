import { useEffect, useState } from 'react';
import css from './App.module.css';
import { searchImages, fakeSearch } from './unsplashApi';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const jsonData = await fakeSearch();
      setData(jsonData);
    };
    getData();
  }, []);

  return (
    <div className={css.app}>
      <h1>Gallery</h1>
      {data.length > 0 && <h3>Images Data</h3>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
