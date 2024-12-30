import React, { useState, useEffect } from 'react';
import '../styles/Slideshow.css';
const baseURL = process.env.REACT_APP_BASE_URL || "https://evotto-backend.vercel.app";

const Slideshow = () => {
  const [images, setImages] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${baseURL}/api/data/slideshow`,); 
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch slideshow images');
        }
        const data = await response.json();
        console.log(data)
        if (data) {
          setImages(data); // Ensure that images exist in the response
        } else {
          console.error('No images found in API response');
        }
      } catch (error) {
        console.error('Error fetching slideshow images:', error);
      }
    };

    fetchImages();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); 
    return () => clearInterval(interval); 
  }, [images]);

  if (images.length === 0) {
    return <div>Loading slideshow...</div>;
  }

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
              src={image.url}
              alt={image.altText || `Slide ${index}`}
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
