import React from 'react';
import people1 from '../../assets/images/people1.png'
import people2 from '../../assets/images/people2.png'
import people3 from '../../assets/images/people3.png'
import Service from '../Services/Service';

const Testimonial = () => {
  return (
    <div className='text-left mt-20  p-5'>
    <h4 className='text-primary text-sm'>Testimonial</h4>
    <h3 className='text-secondary text-2xl'>What Our Patients Says</h3>
    <div className="single_services grid gap-4 grid-cols-1 lg:grid-cols-3 mt-10 pb-10">
      <Service img={people1} title='Winson Herry' info='It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'/>
      <Service img={people2} title='Winson Herry' info='It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'/>
      <Service img={people3} title='Winson Herry' info='It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content'/>
    </div>
  </div>
  );
};

export default Testimonial;