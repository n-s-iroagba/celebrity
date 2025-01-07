import React, { useEffect, useState } from 'react';
import { Container, Navbar, Button, Row, Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import image from '../../Gemini_Generated_Image.jpeg'

import '../../assets/styles/HomePage.css';
import { useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircularImageSlider from '../../components/CircularImageSlider';
import NavbarComponent from '../../components/NavbarComponent';
import VideoContent from '../../components/VideoContent';
import HowItWorks from '../../components/HowItWorks';
import ActionButtons from '../../components/ActionButtons';
import Footer from '../../components/Footer';
import CustomCarousel from '../../components/CustomCarousel';
import image1 from '../../assets/images/felton.png'
import image2 from '../../assets/images/search-for-a-star-1x.png'
import image3 from '../../assets/images/search.png'
import image4 from '../../assets/images/img-fan-clubs.png'

const HomePage: React.FC = () => {
    const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg'>('sm');
    const navigate = useNavigate()

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
  const celebrityImages = [
    image1,
    image,
    image,
    image,
    image,
    image,
    image,
    image,
  ];

  // Group images into chunks for the carousel
  const chunkArray = (array: string[]) => {
    const chunkSize = screenSize==='sm' ? 1: screenSize==='lg' ? 4 :2
    const results = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      results.push(array.slice(i, i + chunkSize));
    }
    return results;
  };

  const imageChunks = chunkArray(celebrityImages);

  

  return (
    <div>
      <NavbarComponent/>

 
      <div className='text-center'>
  <h3> Connect Globally with Your Favorite Stars! 🌍</h3>
  <p>Book phone calls, video calls, shoutouts, and personalized videos with celebrities you love. Your dream interaction, just a click away!</p>
</div>
   
      <CircularImageSlider/>
 
      <Container>

 
  <VideoContent/>


<ActionButtons/>

  
      </Container>
      <HowItWorks/>

<ActionButtons/>
<Footer/>
<CustomCarousel images={celebrityImages}/>
    </div>
   
  );
};

export default HomePage;
