import React from 'react';
import './Appointment.css'
import doctor from '../../assets/images/doctor.png'
import { Link } from 'react-router-dom';

const Appointment = () => {
  return (
      <div className='appointment_area mt-20 mb-20'>
      <div className="card card-side items-center w-5/6 sm:w-4/6 md:w-4/6 m-auto flex-col lg:flex-row">
 <div className='hidden md:block'>
 <img className='max-w-xs' src={doctor} alt="Movie"/>
 </div>
  <div className="card-body inline-block">
    <h5 className='text-primary'>Appointment</h5>
    <h2 className="card-title text-white text-2xl mb-4 mt-3">Make an appointment Today</h2>
    <p className='text-white'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
    <div className="mt-5">
    <Link to='/appointment' className="btn btn-success bg-gradient-to-r from-secondary to-primary text-bold">GET STARTED</Link>
    </div>
  </div>
</div>
    </div>
  );
};

export default Appointment;