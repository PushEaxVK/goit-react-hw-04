import { useId } from 'react';
import css from './SearchBox.module.css';

const SearchBox = ({ query, setQuery }) => {
  const queryId = useId();
  return (
    <div className={css.searchBox}>
      <label htmlFor={queryId}>Find contacts by name</label>
      <input
        type="text"
        name="query"
        value={query}
        onChange={(evt) => setQuery(evt.target.value)}
        id={queryId}
      />
    </div>
  );
};
export default SearchBox;
