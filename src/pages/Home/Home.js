import React from 'react';
import Services from '../Services/Services';
import Banner from './Banner';
import Info from './Info';

const Home = () => {
  return (
    <div className='hero_area bg-white'>
     <Banner/>
     <Info/>
     <Services/>
    </div>
  );
};

export default Home;