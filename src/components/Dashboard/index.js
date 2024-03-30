import React from "react";
import DashboardContent from "./DashboardContent";
import { Box } from "@mui/material";
import Breadcrumb from "../shared/Breadcrumb";


export default function Dashboard() {
    return (
        <Box className="b-10 w-full -ml-10 pr-10 mt-16">
            <Breadcrumb path={"Dashboard"} title={"Dashboard"} />
            <DashboardContent />
        </Box>
    )
}