import React from 'react';
import treatment from '../../assets/images/treatment.png'

const Care = () => {
  return (
    <div className='care_area py-12'>
      <div className="card card-side items-center w-5/6 sm:w-4/6 md:w-4/6 m-auto flex-col lg:flex-row">
  <figure className='className='><img className='max-w-2xl rounded-lg' src={treatment} alt="Movie"/></figure>
  <div className="card-body inline-block">
    <h2 className="card-title text-black text-3xl mb-4">Exceptional Dental Care, on Your Terms</h2>
    <p className='text-black'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
    <div className="mt-5">
    <button className="btn btn-success bg-gradient-to-r from-secondary to-primary text-bold">GET STARTED</button>
    </div>
  </div>
</div>
    </div>
  );
};

export default Care;