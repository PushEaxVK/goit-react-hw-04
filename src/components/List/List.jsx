const List = ({ hits }) => {
  return (
    <ul>
      {hits.map((item) => (
        <li key={item.objectID}>
          <a href={item.url} target="_blank">
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
};
export default List;
