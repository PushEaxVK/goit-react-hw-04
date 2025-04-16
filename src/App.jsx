import { useEffect, useRef, useState } from 'react';
import css from './App.module.css';
import axios from 'axios';
import { fetchHits } from './services/api';
import List from './components/List/List';

function App() {
  const hasFetched = useRef(false);
  const [hits, setHits] = useState([]);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const getData = async () => {
      try {
        const data = await fetchHits();
        setHits(data.hits);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  // useEffect(() => {
  //   if (hasFetched.current) return;
  //   hasFetched.current = true;

  //   const controller = new AbortController();

  //   axios
  //     .get('https://hn.algolia.com/api/v1/search', {
  //       signal: controller.signal,
  //     })
  //     .then((res) => {
  //       setHits(res.data.hits);
  //     });

  //   return () => {
  //     controller.abort;
  //   };
  // }, []);

  return (
    <>
      <div className={css.app}>App</div>
      <List hits={hits} />
    </>
  );
}

export default App;
