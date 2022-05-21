import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebaseinit';
import PageTitle from '../../hooks/PageTitle';
import LoadingSpinner from '../Shared/LoadingSpinner';
import LoadingSpinnerSmall from '../Shared/LoadingSpinnerSmall';
import DeleteModal from './DeleteModal';

const MyAppointment = () => {

  const [name, setName] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [doctorID, setDoctorID] = useState('')
  const [deleteDoctor, setDeleteDoctor] = useState(false)
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [load, setLoad] = useState(false)

  const [user, loading, userror] = useAuthState(auth);
  const accessToken = localStorage.getItem('accessToken')
  const [data, setData] = useState([]);

  // Delete handle
  useEffect(()=>{
    if(deleteDoctor) {
      axios.delete(`https://sheltered-beyond-38485.herokuapp.com/del-booking/${doctorID}`, {
        headers: {
          'authorization': `Bearer ${accessToken}`
        }
      })
      .then(res => {
        if (res.data.deletedCount === 1) {
          toast.success('Cancel Booking Successfully!', {
            position: 'top-center'
          })
          setDeleteAlert(!deleteAlert)
          setDeleteDoctor(false);
          setName('')
        }
      })
    }
    
    },[deleteDoctor])

  useEffect(()=> {
    setLoad(true)
    fetch(`https://sheltered-beyond-38485.herokuapp.com/my-appointment?email=${user?.email}`, {
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
  setData(data);
  setLoad(false)
 } else {
   signOut(auth);
   localStorage.removeItem('accessToken')
 }
   
  })
  },[deleteAlert])
  
  const handleCancle = (id, name, specialty) => {
    setName(name)
    setSpecialty(specialty)
    setDoctorID(id)
  }

  if(load) {
    return <div>
      <LoadingSpinner/>
    </div>
  }

  return (
    <div>
      
      <PageTitle title='My Appointments'/>
      <h2 className='mb-3'>My Appointment</h2>
      <div className="overflow-x-auto">
  {data.length > 0 ? 
  
  <table className="table table-normal w-full">
    <thead>
      <tr>
        <th>#</th>
        <th>SERVICE</th>
        <th>Date</th>
        <th>Slot</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {data?.map((s, index) => <tr key={s._id}>
        <th>{index+1}</th>
        <td>{s.serviceName}</td>
        <td>{s.date}</td>
        <td>{s.slot}</td>
        <td>
        {!s.payment ? <Link to={`/dashboard/payment/${s._id}`} className="btn btn-xs bg-gradient-to-r from-primary to-secondary border-0 text-white">{`Pay $${s.price}`}</Link> : <button className="btn btn-xs bg-green-500 border-0 text-white">Payment done</button> }
        &nbsp;{!s.payment ? <label htmlFor="delete-confirm-modal"   onClick={()=>handleCancle(s._id, s.serviceName, s.date)} className="btn btn-error btn-xs border-0 text-white modal-button">Cancel</label> : '' }
        </td>
      </tr>)}
    </tbody>
  </table> : 
  <div className='text-[red]'>
    You don't have any appointment
    </div>}
  
{name && <DeleteModal name={name} specialty={`Date: ${specialty}`} setDeleteDoctor={setDeleteDoctor}/>}
</div>
    </div>
  );
};

export default MyAppointment;