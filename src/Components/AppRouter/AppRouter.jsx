import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Forside from '../../Pages/Forside/Forside';
import Hotels from '../../Pages/Hotels/Hotels';
import HotelCity from '../../Pages/Hotels/HotelCity';
import HotelDetails from '../../Pages/Hotels/HotelDetails';
import Rooms from '../../Pages/Rooms/Rooms';
import LoginPage  from '../../Pages/Login/Login'; 
import Reservations from '../../Pages/Reservations/Reservations';
import NoPage from '../../Pages/NoPage/NoPage';

const AppRouter = () => {
  return (
    <Router>
      <NavBar />
        <Routes>
          <Route path="/" element={<Forside />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:city" element={<HotelCity />} />
          <Route path="/hotels/:city/:hotelId" element={<HotelDetails />} />
          <Route path="/rooms/" element={<Rooms />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reservation" element={<Reservations />} />
          <Route path="*" element={<NoPage />} />
        </Routes>

    </Router>
  );
};

export default AppRouter;
