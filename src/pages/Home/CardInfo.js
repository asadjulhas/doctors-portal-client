import React from 'react';

const CardInfo = ({title, info, img, bg}) => {
  return (
      <div className={`card lg:card-side ${bg} shadow-xl text-white lg:w-1/3 m-5`}>
  <figure><img className='ml-0 p-5 mt-3 lg:p-0 lg:mt-0 md:ml-0 lg:ml-5' src={img} alt="Album"/></figure>
  <div className="card-body text-center lg:text-left">
    <h2 className="card-title inline-block">{title}</h2>
    <p>{info}</p>
  </div>
</div>
  );
};

export default CardInfo;