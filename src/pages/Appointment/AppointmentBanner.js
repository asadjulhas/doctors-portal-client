import banner from '../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const AppointmentBanner = ({date, setDate}) => {
  return (
    <div className="hero">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <img src={banner} className="max-w-sm rounded-lg shadow-2xl" alt='' />
    <div className='mr-20 rounded-lg bg-white shadow-md'>
    <DayPicker 
      mode="single"
      selected={date}
      onSelect={setDate}
       />
    </div>
  </div>
</div>
  );
};

export default AppointmentBanner;