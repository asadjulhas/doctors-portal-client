import logo from './logo.svg';
import './App.css';
import Header from './pages/Shared/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import AppointmentPage from './pages/Appointment/AppointmentPage';

function App() {
  return (
    <div className="App max-w-screen-xl mx-auto">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/appointment' element={<AppointmentPage/>} />
      </Routes>
    </div>
  );
}

export default App;
