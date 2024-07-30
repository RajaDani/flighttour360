import { Box, Grid, Card, Avatar, Typography } from '@mui/material'
import React from 'react'
import { useEffect, useState } from "react";
import FlightIcon from '@mui/icons-material/Flight';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';
import { baseurl } from '../shared/baseUrl';
import FlightsCharts from './FlightsCharts';

export default function DashboardContent() {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  async function getDashboardSummary() {
    const response = await fetch(`${baseurl}/dashboard/summary`);
    const flights = await response.json();
    setData(flights.data);
  }

  useEffect(() => {
    getDashboardSummary();
  }, [])

  return (
    <>
      <Grid container direction="row" spacing={2} className='p-8' sx={{ marginTop: "-30px" }} >
        <Grid item sm={6} md={3}>
          <Card className="flex items-center p-8" sx={{ borderRadius: 2, border: "1px solid red" }} >
            <Avatar variant="rounded" sx={{ border: "1px solid red", height: 60, width: 60, backgroundColor: "red", borderRadius: 2 }}>
              <FlightIcon className='text-white' sx={{ fontSize: 35 }} />
            </Avatar>
            <Box className="ml-6">
              <Typography className='font-light text-gray-500' sx={{ fontSize: 16 }}>
                Total Planes
              </Typography>
              <Typography className='font-bold mt-2' sx={{ fontSize: 20 }}>
                {data[0]?.total_planes}
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item sm={6} md={3}>
          <Card className="flex items-center p-8 rounded-xl shadow-xl" sx={{ borderRadius: 2, border: "1px solid #695ff5" }}>
            <Avatar variant="rounded" sx={{ border: "1px solid #695ff5", height: 60, width: 60, backgroundColor: "#695ff5", borderRadius: 2 }}>
              <EventAvailableIcon className='text-white' sx={{ fontSize: 35 }} />
            </Avatar>
            <Box className="ml-6">
              <Typography className='text-14 font-light text-gray-500' sx={{ fontSize: 16 }}>
                Booked Flights
              </Typography>
              <Typography className='font-bold mt-2' sx={{ fontSize: 20 }}>
                {data[0]?.booked_flights}
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item sm={6} md={3}>
          <Card className="flex items-center p-8 rounded-xl shadow-lg" sx={{ borderRadius: 2, border: "1px solid green" }}>
            <Avatar variant="rounded" sx={{ border: "1px solid green", height: 60, width: 60, backgroundColor: "green", borderRadius: 2 }}>
              <PeopleIcon className='text-white' sx={{ fontSize: 35 }} />
            </Avatar>
            <Box className="ml-6">
              <Typography className='text-14 font-light text-gray-500' sx={{ fontSize: 16 }}>
                Total Customers
              </Typography>
              <Typography className='font-bold mt-2' sx={{ fontSize: 20 }}>
                {data[0]?.total_users}
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item sm={6} md={3}>
          <Card className="flex items-center p-8 rounded-xl shadow-lg" sx={{ borderRadius: 2, border: "1px solid #ed8d55" }}>
            <Avatar variant="rounded" sx={{ border: "1px solid #ed8d55", height: 60, width: 60, backgroundColor: "#ed8d55", borderRadius: 2 }}>
              <PaidIcon className='text-white' sx={{ fontSize: 35 }} />
            </Avatar>
            <Box className="ml-6">
              <Typography className='text-14 font-light text-gray-500' sx={{ fontSize: 16, opacity: "0.8" }}>
                Total Earning
              </Typography>
              <Typography className='font-bold mt-2' sx={{ fontSize: 20 }}>
                Pkr.{data[0]?.total_amount}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid >

      <FlightsCharts />
    </>
  )
}
