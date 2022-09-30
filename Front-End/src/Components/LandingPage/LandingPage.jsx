import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LandingCarousel from './Features/Carousel.jsx';

const LandingPage = () => {
  return (

    <div>
      Landing Page
      <LandingCarousel/>
    </div>

  )
}

export default LandingPage;