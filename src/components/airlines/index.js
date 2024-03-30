import React from 'react'
import { Box } from "@mui/material";
import Breadcrumb from "../shared/Breadcrumb";
import AllAirlines from './AllAirlines';

export default function Airlines() {
    return (
        <Box className="b-10 w-full -ml-10 pr-10 mt-16">
            <Breadcrumb path={"Airlines"} title={"Airlines"} />
            <AllAirlines />
        </Box>
    )
}
