import React from 'react';
import Service from './Service';
import fluoride from '../../assets/images/fluoride.png'
import cavity from '../../assets/images/cavity.png'
import whitening from '../../assets/images/whitening.png'

const Services = () => {
  return (
    <div className='text-center mt-20'>
      <h4 className='text-primary text-sm'>OUR SERVICES</h4>
      <h3 className='text-secondary text-2xl'>Services We Provide</h3>
      <div className="single_services grid gap-4 grid-cols-1 lg:grid-cols-3 mt-10 pb-10 p-5">
        <Service img={fluoride} title='Fluoride Treatment' info='Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'/>
        <Service img={cavity} title='Cavity Filling' info='Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'/>
        <Service img={whitening} title='Teeth Whitening' info='Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the'/>
      </div>
    </div>
  );
};

export default Services;