import s from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images }) => {
  return (
    <div>
      {/* <h2>ImageGallery</h2> */}
      <ul className={s.imagesList}>
        {images.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
