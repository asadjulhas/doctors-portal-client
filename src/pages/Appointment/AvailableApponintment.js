import React from 'react';

const AvailableApponintment = ({id, name, slots}) => {
  return (
    <div className="card max-w-xs bg-base-100 shadow-xl">
    <div className="card-body text-center">
      <h2 className="card-title  inline-block text-secondary">{name}</h2>
      <p>{slots.length ? slots[0] : <span className='text-warning'>No slot available</span>}</p>
      <p className='text-xs'>{slots.length} SPACE{slots.length > 1 ? 'S' : ''} AVAILABLE</p>
      <div className="card-actions  inline-block">
        <button disabled={slots.length === 0} className="btn btn-primary bg-gradient-to-r from-secondary to-primary text-white mt-5">Book Appointment</button>
      </div>
    </div>
  </div>
  );
};

export default AvailableApponintment;