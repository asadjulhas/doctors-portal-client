import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import PageTitle from '../../hooks/PageTitle';

const DashBoard = () => {
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
      <li><Link to='/dashboard/all-users'>All users</Link></li>
    </ul>
  
  </div>
</div>
  );
};

export default DashBoard;