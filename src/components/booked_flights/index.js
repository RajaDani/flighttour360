import React from 'react'
import { Box } from "@mui/material";
import Breadcrumb from "../shared/Breadcrumb";
import AllBookedFlights from './AllBookedFlights';

export default function BookedFlights() {
    return (
        <Box className="b-10 w-full -ml-10 pr-10 mt-16">
            <Breadcrumb path={"Booked Flights"} title={"Booked Flights"} />
            <AllBookedFlights />
        </Box>
    )
}
