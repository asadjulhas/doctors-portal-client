import logo from './logo.svg';
import './App.css';
import Header from './pages/Shared/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import AppointmentPage from './pages/Appointment/AppointmentPage';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import RequireAuth from './hooks/RequireAuth';
import DashBoard from './pages/DashBoadr/DashBoard';
import MyAppointment from './pages/DashBoadr/MyAppointment';
import MyReview from './pages/DashBoadr/MyReview';
import AllUsers from './pages/DashBoadr/AllUsers';
import RequireAdmin from './hooks/RequireAdmin';
import AddDoctor from './pages/DashBoadr/AddDoctor';
import ManageDoctor from './pages/DashBoadr/ManageDoctor';
import Payment from './pages/DashBoadr/Payment';

function App() {
  return (
    <div className="App max-w-screen-xl mx-auto">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* <Route path='/about' element={<About/>} /> */}
        <Route path='/appointment' element={
          <RequireAuth>
            <AppointmentPage/>
          </RequireAuth>
        } />
        <Route path='/dashboard' element={
        <RequireAuth>
        <DashBoard/>
        </RequireAuth>
        }>
          <Route index element={<MyAppointment/>}/>
          {/* <Route path='review' element={<MyReview/>}/> */}
          <Route path='all-users' element={
            <RequireAdmin>
          <AllUsers/>
          </RequireAdmin>
          }/>
          <Route path='add-doctor' element={
            <RequireAdmin>
          <AddDoctor/>
          </RequireAdmin>
          }/>
          <Route path='manage-doctor' element={
            <RequireAdmin>
          <ManageDoctor/>
          </RequireAdmin>
          }/>
          <Route path='payment/:id' element={<Payment/>} />
        </Route>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
