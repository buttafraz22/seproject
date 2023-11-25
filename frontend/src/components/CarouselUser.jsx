import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Hero1 from '../assets/hero-1.jpg';
import Hero2 from '../assets/hero-2.jpg';
import Hero3 from '../assets/hero-3.jpg';
import Hero4 from '../assets/hero-4.jpg';

export default function UserCarousel() {
  const handleSelect = (selectedIndex, e) => {
    // Add any additional logic based on the active index if needed
    console.log(`Selected index: ${selectedIndex}`);
  };

  return (
    <div className="position-relative">
      <div className="row">
        <div className="col-md-12">
          <Carousel onSelect={handleSelect}>
            <Carousel.Item interval={1000}>
              <img className="d-block w-100" src={Hero1} alt="Hero 1" />
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <img className="d-block w-100" src={Hero2} alt="Hero 2" />
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <img className="d-block w-100" src={Hero3} alt="Hero 3" />
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <img className="d-block w-100" src={Hero4} alt="Hero 4" />
            </Carousel.Item>
          </Carousel>
          <div className="carousel-heading position-absolute top-50 start-50 translate-middle text-center">
            <h1 style={{ color: 'white' }}>Welcome to Cuarto Bank!</h1>
          </div>
        </div>
      </div>

    </div>
  );
}
