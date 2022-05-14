import React from 'react';

const Service = ({img, title, info}) => {
  return (
    <div>
      <div className="card card-compact bg-white shadow-2xl text-center">
  <figure><img className='p-5' src={img} alt={title} /></figure>
  <div className="card-body">
    <h2 className="card-title inline-block">{title}</h2>
    <p className=' text-center'>{info}</p> 
  </div>
</div>
    </div>
  );
};

export default Service;