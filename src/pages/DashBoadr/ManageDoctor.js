import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import PageTitle from '../../hooks/PageTitle';
import LoadingSpinnerSmall from '../Shared/LoadingSpinnerSmall';
import DeleteModal from './DeleteModal';

const ManageDoctor = () => {
  const [name, setName] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [doctorID, setDoctorID] = useState('')
  const [deleteDoctor, setDeleteDoctor] = useState(false)

  
useEffect(()=>{
if(deleteDoctor) {
  axios.delete(`https://sheltered-beyond-38485.herokuapp.com/delete/${doctorID}`, {
    headers: {
      'authorization': `Bearer ${accessToken}`
    }
  })
  .then(res => {
    if (res.data.deletedCount === 1) {
      toast.success('Delete Doctor Successfully!', {
        position: 'top-center'
      })
      setDeleteDoctor(false);
      refetch();
      setName('')
    }
  })
}

},[deleteDoctor])

  const accessToken = localStorage.getItem('accessToken')
  const {data, isLoading, refetch} = useQuery(['allDoctoe'], () => fetch('https://sheltered-beyond-38485.herokuapp.com/doctor', {
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

const handleDelete = (id, name, specialty) => {
setName(name)
setSpecialty(specialty)
setDoctorID(id)
}



  return (
    <div>
    <PageTitle title='Manage doctor'/>
    <h2 className='mb-3'>All Doctors</h2>
    <div className="overflow-x-auto">
<table className="table table-normal w-full">
  <thead>
    <tr>
      <th>#</th>
      <th>Image</th>
      <th>Name</th>
      <th>Email</th>
      <th>Specialty</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {data?.map((s, index) => <tr key={s._id}>
      <th>{index+1}</th>
      <td>
    <img className='rounded-full w-[40px] h-[40px]' src={s.image} title={s.name} alt={s.name} />
      </td>
      <td>{s.name}</td>
      <td>{s.email}</td>
      <td>{s.specialty}</td>
      <td>
      <div className="indicator">
      
<label htmlFor="delete-confirm-modal"  onClick={()=>handleDelete(s._id, s.name, s.specialty)} className="btn btn-error btn-xs border-0 text-white modal-button">Remove Doctor</label>
</div>
      </td>
    </tr>)}
  </tbody>
</table>
{name && <DeleteModal name={name} specialty={`specialty: ${specialty}`} setDeleteDoctor={setDeleteDoctor}/>}
</div>
</div>
  );
};

export default ManageDoctor;