import React, { useEffect } from 'react';
import { Button } from './Button';
import './HeroSection.css';
import { useHistory } from 'react-router-dom';

function HeroSection() {
  const history = useHistory();

  const handleGetStarted = () => {
    // Navigate to the '/products' route when the button is clicked
    history.push('/products');
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className='hero-cont'>
      <video className='video' src='../images/tech.gif' autoPlay loop muted />
      <h1>CHALLENGE AWAITS</h1>
      <p>What's your limit?</p>
      <div className='hero-btns'>
        <Button to='/services'
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
          onClick={handleGetStarted}
        >
          GET STARTED
        </Button>
        <Button to='/products'
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={() => console.log('hey')}
        >
          READ DEMO <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
