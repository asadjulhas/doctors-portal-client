import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebaseinit';
import PageTitle from '../../hooks/PageTitle';
import LoadingSpinner from '../Shared/LoadingSpinner';
import LoadingSpinnerSmall from '../Shared/LoadingSpinnerSmall';
import './Dashboard.css'

const DashBoard = () => {
  const accessToken = localStorage.getItem('accessToken')
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState([])
  useEffect(() => {
    fetch(`https://sheltered-beyond-38485.herokuapp.com/check-admin/${user.email}`,  {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${accessToken}`
    }
  })
    .then(res => res.json())
    .then(data => setData(data))
  },[])
  
  return (
    <div className="drawer drawer-mobile bg-[#F1F5F9]">
      <PageTitle title='Dashboard'/>
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center mt-5">
    {/* <h2 className='text-2xl text-purple-600'>Dashboard</h2> */}
    <Outlet/>
    
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
    <ul className="menu p-4 overflow-y-auto w-55 bg-base-100 text-base-content">
      {/* <!-- Sidebar content here --> */}
      <li><Link to='/dashboard'>My Appointments</Link></li>
      <li><Link to='/dashboard/review'>My Review</Link></li>
      {data?.role === 'admin' ?<li><Link to='/dashboard/all-users'>All users</Link></li> : ''}
    </ul>
  
  </div>
</div>
  );
};

export default DashBoard;