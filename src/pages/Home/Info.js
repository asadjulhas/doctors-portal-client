import React from 'react';
import CardInfo from './CardInfo';
import clock from '../../assets/icons/clock.svg'
import location from '../../assets/icons/marker.svg'
import call from '../../assets/icons/phone.svg'

const Info = () => {
  return (
    <div className='flex flex-col md:flex-row'>
      <CardInfo img={clock} bg='bg-gradient-to-r from-secondary to-primary' title='Opening Hours' info='Lorem Ipsum is simply dummy text of the pri'/>
      <CardInfo img={location} bg='bg-accent' title='Visit our location' info='Brooklyn, NY 10036, United States'/>
      <CardInfo img={call} bg='bg-gradient-to-r from-secondary to-primary' title='Contact us now' info='+000 123 456789'/>
    </div>
  );
};

export default Info;