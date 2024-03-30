import Dashboard from './components/Dashboard';
import Airlines from './components/airlines';
import Flights from './components/flights';
import Navbar from './navigation/Navbar';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import customTheme from './muiConfig';
import Airports from './components/airports';

function App() {
  return (
    <ThemeProvider theme={customTheme} >
      <div className='flex'>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/airlines" element={<Airlines />} />
            <Route path="/airports" element={<Airports />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
