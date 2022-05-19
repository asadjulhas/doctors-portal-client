import React from 'react';
import './Banner.css'
import banner from '../../assets/images/chair.png'
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className='banner_area'>
       <div className="hero min-h-screen bg-white">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={banner} className="max-w-lg rounded-lg" />
    <div>
      <h1 className="text-5xl font-bold text-black">Your New Smile Starts Here</h1>
      <p className="py-6 text-black">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the</p>
      <Link to='/appointment' className="btn btn-success bg-gradient-to-r from-secondary to-primary text-bold">GET STARTED</Link>
    </div>
  </div>
</div>
    </div>
  );
};

export default Banner;