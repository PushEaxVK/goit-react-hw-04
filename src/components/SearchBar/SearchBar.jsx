import s from './SearchBar.module.css';

const SearchBar = ({ onSubmit, toast }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const query = form.elements.query.value.trim();

    if (query === '') {
      toast.error('Query is empty!');
      return;
    }

    onSubmit(query);
    form.reset();
  };

  return (
    <header className={s.searchBar}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};
export default SearchBar;
