import React, { useEffect, useState } from 'react';
import '../assets/styles/CustomCarousel.css';
import { Carousel } from 'react-bootstrap';

interface CustomCarouselProps {
  images: string[]; // Array of image URLs
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ images }) => {
    const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg'>('sm');


    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 768) {
          setScreenSize('sm');
        } else if (window.innerWidth <= 992) {
          setScreenSize('md');
        } else {
          setScreenSize('lg');
        }
      };
  
      // Initial check on component mount
      handleResize();
  
      // Attach event listener
      window.addEventListener('resize', handleResize);
  
      // Cleanup event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
    const chunkArray = (array: string[]) => {
        const chunkSize = screenSize==='sm' ? 1: screenSize==='lg' ? 4 :2
        const results = [];
        for (let i = 0; i < array.length; i += chunkSize) {
          results.push(array.slice(i, i + chunkSize));
        }
        return results;
      };
    
      const imageChunks = chunkArray(images);
  return (
    <Carousel className='bg-light' indicators={false} controls={false} interval={3000}>
    {imageChunks.map((chunk, index) => (
      <Carousel.Item key={index}>
        <div className="d-flex justify-content-center">
          {chunk.map((img, idx) => (
            <div className="p-2" style={{ flex: '1 1 25%' }} key={idx}>
              <img
                src={img}
                alt={`Celebrity ${idx + 1}`}
                className="img-fluid rounded"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      </Carousel.Item>
    ))}
  </Carousel>
  );
};

export default CustomCarousel;
