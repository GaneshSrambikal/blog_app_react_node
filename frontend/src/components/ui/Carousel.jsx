import { useCallback, useEffect, useState } from 'react';
import '../../styles/carousel.css';
import { GoDot } from 'react-icons/go';
const Carousel = ({ children }) => {
  let interval = 20000;
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setSlideIndex((prev) => (prev + 1) % children.length);
  }, [children.length]);
  const currentSlide = (indexValue) => {
    setSlideIndex(indexValue);
  };
  useEffect(() => {
    const autoPlaySlide = setInterval(nextSlide, interval);
    return () => clearInterval(autoPlaySlide);
  }, [interval, nextSlide]);
  return (
    <div className='homepage-carousel-container'>
      {children[slideIndex]}
      <div className='carousel-dots-container'>
        {children.map((element, index) => (
          <div key={index} className='carousel-dots'>
            <GoDot
              onClick={() => currentSlide(index)}
              style={{
                border: slideIndex === index && '1px solid #263246',
                borderRadius: '50%',
                color: slideIndex === index && '#263246',
                fontSize: slideIndex === index && '1.5rem',
                cursor: 'pointer',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
