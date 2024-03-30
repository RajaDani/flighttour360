import React from 'react'
import { Box } from "@mui/material";
import Breadcrumb from "../shared/Breadcrumb";
import AllFlights from './AllFlights';

export default function Flights() {
    return (
        <Box className="b-10 w-full -ml-10 pr-10 mt-16">
            <Breadcrumb path={"Flights"} title={"Flights"} />
            <AllFlights />
        </Box>
    )
}
