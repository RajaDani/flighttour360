import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightIcon from '@mui/icons-material/Flight';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AirlinesIcon from '@mui/icons-material/Airlines';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

export const navList = [
    { name: "Dashboard", link: "/dashboard", icon: <DashboardIcon /> },
    { name: "Flights", link: "/flights", icon: <FlightIcon /> },
    { name: "Air lines", link: "/airlines", icon: <AirlinesIcon /> },
    { name: "Airports", link: "/airports", icon: <AirplaneTicketIcon /> },
    { name: "Aeroplanes", link: "/planes", icon: <ConnectingAirportsIcon /> },
    { name: "Booked Flights", link: "/booked-flights", icon: <BookmarksIcon /> },
    { name: "Add Admin", link: "/add-admin", icon: <SupervisorAccountIcon /> },
    // {name:"Signin",link:"/dashboard",icon:"dashboard"},
    // {name:"Dashboard",link:"/dashboard",icon:"dashboard"},
]