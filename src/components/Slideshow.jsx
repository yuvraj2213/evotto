import React, { useState, useEffect } from 'react';
import '../styles/Slideshow.css';

const images = [
  '/images/Slideshow/img1.jpg',
  '/images/Slideshow/img2.jpg',
  '/images/Slideshow/img3.jpg'
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Automatically move to the next slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // 3000 ms = 3 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="slideshow-container">
      <button className="arrow left-arrow" onClick={prevSlide}>
        &#8249;
      </button>
      <div className="slider">
        {images.map((image, index) => {
          const isCurrent = index === currentIndex;
          const isLeft = index === (currentIndex - 1 + images.length) % images.length;
          const isRight = index === (currentIndex + 1) % images.length;

          return (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className={`slide ${
                isCurrent ? 'current' : isLeft ? 'left' : isRight ? 'right' : 'hidden'
              }`}
            />
          );
        })}
      </div>
      <button className="arrow right-arrow" onClick={nextSlide}>
        &#8250;
      </button>
    </div>
  );
};

export default Slideshow;
