import Dashboard from './components/Dashboard';
import Airlines from './components/airlines';
import Flights from './components/flights';
import Navbar from './navigation/Navbar';
import { Routes, Route, Navigate, BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './muiConfig';
import Airports from './components/airports';
import AddAdmin from './components/auth/AddAdmin';
import { useEffect } from 'react';
import Login from './components/auth/Login';
import Planes from './components/planes';
import BookedFlights from './components/booked_flights';
import Review from './components/reviews/Review';
import ChatApp from './components/chat';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("adminData"));
    if (!admin?.name) navigate("/login")
  }, [])

  return (
    <ThemeProvider theme={customTheme} >
      <div className='flex'>
        {pathname != "/login" && <Navbar />}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/airlines" element={<Airlines />} />
          <Route path="/airports" element={<Airports />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/booked-flights" element={<BookedFlights />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/chat" element={<ChatApp />} />


          <Route path="/add-admin" element={<AddAdmin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
