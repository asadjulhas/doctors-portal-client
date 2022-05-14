import React from 'react';
import PageTitle from '../../hooks/PageTitle';
import Appointment from '../Appointment/Appointment';
import Care from '../Care/Care';
import ContactUs from '../ContactUs/ContactUs';
import Services from '../Services/Services';
import Footer from '../Shared/Footer';
import Testimonial from '../Testimonial/Testimonial';
import Banner from './Banner';
import Info from './Info';

const Home = () => {
  return (
    <div className='hero_area bg-white'>
      <PageTitle title='Home'/>
     <Banner/>
     <Info/>
     <Services/>
     <Care/>
     <Appointment/>
     <Testimonial/>
     <ContactUs/>
     <Footer/>
    </div>
  );
};

export default Home;