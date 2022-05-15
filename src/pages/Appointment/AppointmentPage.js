import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import PageTitle from '../../hooks/PageTitle';
import Footer from '../Shared/Footer';
import AppointmentBanner from './AppointmentBanner';
import AvailableApponintment from './AvailableApponintment';
import BookingMOdal from './BookingMOdal';

const AppointmentPage = () => {
  const [date, setDate] = useState(new Date());
  const [apponinent, setApponinent] = useState(null)
  const [services, setServices] = useState([]);
  useEffect(() => {
    fetch('services.json')
    .then(res => res.json())
    .then(data => setServices(data))
  },[]);
  return (
    <div>
      <PageTitle title='Appointment'/>
      <AppointmentBanner date={date} setDate={setDate}/>

<div className="availableApp text-center mt-20 py-12">
  
<h4 className="text-secondary text-lg">Available Services on {format(date, 'PP')}</h4>
      <h3 className="text-accent text-md">Please select a service.</h3>
<div className="apponints  grid gap-6 grid-cols-1  md:grid-cols-2 lg:grid-cols-3 mt-20">
  {services.map(service => <AvailableApponintment key={service._id} service={service} setApponinent={setApponinent}/>)}

  {apponinent && <BookingMOdal date={format(date, 'PP')} apponinent={apponinent} setApponinent={setApponinent}/>}
</div>
</div>
      <Footer/>
    </div>
  );
};

export default AppointmentPage;