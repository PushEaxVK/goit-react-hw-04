import Contact from '../Contact/Contact';
import css from './ContactList.module.css';

const ContactList = ({ list, handleRemoveContact }) => {
  return (
    <ul className={css.list}>
      {list.map((contact) => (
        <li key={contact.id}>
          <Contact
            contact={contact}
            handleRemoveContact={handleRemoveContact}
          />
        </li>
      ))}
    </ul>
  );
};
export default ContactList;
