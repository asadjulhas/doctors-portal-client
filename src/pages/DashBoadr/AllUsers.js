import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../../firebaseinit';
import LoadingSpinnerSmall from '../Shared/LoadingSpinnerSmall';

const AllUsers = () => {
  const accessToken = localStorage.getItem('accessToken')
  const {data, isLoading, refetch} = useQuery(['alluser'], () => fetch('https://sheltered-beyond-38485.herokuapp.com/all-users', {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${accessToken}`
    }
  })
.then(res => res.json())
)
if(isLoading) {
  return <div className="min-h-screen flex items-center user_loading">
    <LoadingSpinnerSmall/>
  </div>
}


// Make admin
const makeAdmin = (email) => {
  fetch(`https://sheltered-beyond-38485.herokuapp.com/admin/${email}`, {
    method: 'PUT',
    headers: {
      'authorization': `Bearer ${accessToken}`
    }
  })
  .then(ress => ress.json())
  .then(res => {
    if(res.message) {
      toast.error(`${res.message}`, {
        position: "top-center",})
    }
        else if(res.result.acknowledged) {
          refetch()
          toast.success('Make admin successfully!', {
            position: "top-center",})
        }
      })

}

// Remove admin
const removeAdmin = (email) => {
  fetch(`https://sheltered-beyond-38485.herokuapp.com/remove-admin/${email}`, {
    method: 'PUT',
    headers: {
      'authorization': `Bearer ${accessToken}`
    }
  })
  .then(ress => ress.json())
      .then(res => {
        if(res.message) {
          toast.error(`${res.message}`, {
            position: "top-center",})
        }
            else if(res.result.acknowledged) {
          refetch()
          toast.warn('Remove admin successfully!', {
            position: "top-center",})
        }
      })

}

  return (
    <div>
    <h2 className='mb-3'>Appointment users</h2>
    <div className="overflow-x-auto">
<table className="table table-normal w-full">
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
      <th>Email</th>
      <th>ID</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {data?.map((s, index) => <tr key={s._id}>
      <th>{index+1}</th>
      <td>{s.name}</td>
      <td>{s.email}</td>
      <td>{s._id}</td>
      <td>
      <div className="indicator">
 {s.role ?  <span className="indicator-item indicator-center badge badge-secondary">{s.role}</span> : ''}
      {s.role === 'admin' ? <button onClick={()=>removeAdmin(s.email)} className="btn btn-xs bg-gradient-to-r from-primary to-secondary border-0 text-white">Remove admin</button> : <button onClick={()=>makeAdmin(s.email)} className="btn btn-xs bg-gradient-to-r from-secondary to-primary border-0 text-white">Make admin</button> }
</div>
      </td>
    </tr>)}
  </tbody>
</table>
</div>
</div>
  );
};

export default AllUsers;