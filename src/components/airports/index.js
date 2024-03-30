import React from 'react'
import { Box } from "@mui/material";
import Breadcrumb from "../shared/Breadcrumb";
import AllAirports from './AllAirports';

export default function Airports() {
    return (
        <Box className="b-10 w-full -ml-10 pr-10 mt-16">
            <Breadcrumb path={"Airports"} title={"Airports"} />
            <AllAirports />
        </Box>
    )
}
