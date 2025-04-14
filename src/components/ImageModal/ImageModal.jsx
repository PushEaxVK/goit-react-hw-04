import { useEffect } from 'react';
import s from './ImageModal.module.css';

const ImageModal = ({ modalUrl, setModal }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setModal('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div
      className={s.modal}
      onClick={() => {
        setModal('');
      }}
    >
      <img src={modalUrl} />
    </div>
  );
};

export default ImageModal;
