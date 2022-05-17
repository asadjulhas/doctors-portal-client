import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../firebaseinit';
import LoadingSpinnerSmall from '../Shared/LoadingSpinnerSmall';

const MyAppointment = () => {
  const [user, loading, userror] = useAuthState(auth);
  const accessToken = localStorage.getItem('accessToken')
  const [data, setData] = useState([]);

  useEffect(()=> {
    fetch(`http://localhost:5000/my-appointment?email=${user?.email}`, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${accessToken}`
    }
  }) 
  .then(res => {
  if(res.status === 401 || res.status === 403) {
    toast.error('Forbidden access', {
      position: "top-center",
    })
  }
   return res.json()
  })
  .then(data => {
    
 if(!data.Message) {
  setData(data)
 } else {
   signOut(auth);
   localStorage.removeItem('accessToken')
 }
   
  })
  },[user])
  

  return (
    <div>
      <h2 className='mb-3'>My Appointment</h2>
      <div className="overflow-x-auto">
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