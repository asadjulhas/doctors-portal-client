import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import PageTitle from '../../hooks/PageTitle';
import Footer from '../Shared/Footer';
import LoadingSpinner from '../Shared/LoadingSpinner';
import LoadingSpinnerSmall from '../Shared/LoadingSpinnerSmall';
import AppointmentBanner from './AppointmentBanner';
import AvailableApponintment from './AvailableApponintment';
import BookingMOdal from './BookingMOdal';

const AppointmentPage = () => {
  const [date, setDate] = useState(new Date());
  const [apponinent, setApponinent] = useState(null)
 const formatedDate = format(date, 'PP');

  const {data: services, isLoading, refetch} = useQuery(['available', formatedDate], ()=> fetch(`http://localhost:5000/available?date=${formatedDate}`)
  .then(res => res.json())
  )
  return (
    <div>
      <PageTitle title='Appointment'/>
      <AppointmentBanner date={date} setDate={setDate}/>

<div className="availableApp text-center mt-5 py-12">
  
<h4 className="text-secondary text-lg">Available Services on {format(date, 'PP')}</h4>
      <h3 className="text-accent text-md mb-5">Please select a service.</h3>
      {isLoading ? <LoadingSpinnerSmall/> : ''}
<div className="apponints  grid gap-6 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 mt-10">
  {services?.map(service => <AvailableApponintment key={service._id} service={service} setApponinent={setApponinent}/>)}

  {apponinent && <BookingMOdal refetch={refetch} date={format(date, 'PP')} apponinent={apponinent} setApponinent={setApponinent}/>}
</div>
</div>
      <Footer/>
    </div>
  );
};

export default AppointmentPage;