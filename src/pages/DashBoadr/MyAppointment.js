import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebaseinit';
import LoadingSpinnerSmall from '../Shared/LoadingSpinnerSmall';

const MyAppointment = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user.email)
  const {data, isLoading} = useQuery([MyAppointment], ()=> fetch(`http://localhost:5000/my-appointment?email=${user?.email}`) 
  .then(res => res.json())
  );
  return (
    <div>
      <h2 className='mb-3'>My Appointment</h2>
      <div className="overflow-x-auto">
        {isLoading ? <LoadingSpinnerSmall/> : ''}
  <table className="table table-normal w-full">
    <thead>
      <tr>
        <th>#</th>
        <th>SERVICE</th>
        <th>Date</th>
        <th>Slot</th>
      </tr>
    </thead>
    <tbody>
      {data?.map((s, index) => <tr key={s._id}>
        <th>{index+1}</th>
        <td>{s.serviceName}</td>
        <td>{s.date}</td>
        <td>{s.slot}</td>
      </tr>)}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default MyAppointment;