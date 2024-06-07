"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
    Button,
    Box,
    Grid,
    Typography,
    Table,
    Icon,
    Input,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Autocomplete,
    TextField,
    TablePagination,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2'
import UpdateDialog from './UpdateDialog';
import { baseurl } from "../shared/baseUrl";
import { countriesList } from "../shared/countryList";
import Chip from '@mui/material/Chip';

export default function AllFlights(props) {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [flightData, setFlightData] = useState({
        plane_id: "",
        departure_time: "",
        arrival_time: "",
        total_seats: 1,
        ticket_price: 0,
        departure_airport : "",
        arrival_airport: ""
    });
    const [updateData, setUpdateData] = useState();
    const [planesData, setPlanesData] = useState();
    const [airportsData, setAirportsData] = useState();

    async function getFlights() {
        const response = await fetch(`${baseurl}/flights`);
        const flights = await response.json();
        setData(flights.data);
        setFilteredData(flights.data);
    }

    async function getPlanes() {
        const response = await fetch(`${baseurl}/planes`);
        const planes = await response.json();
        setPlanesData(planes.data);
    }

    async function getAirports() {
        const response = await fetch(`${baseurl}/airports`);
        const airports = await response.json();
        setAirportsData(airports.data);
    }

    async function addFlight() {
        await fetch(`${baseurl}/flight/add`,
            {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(flightData)
            }).then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        title: "Success",
                        text: "Flight added successfully!",
                        icon: "success"
                    });
                    getFlights()
                    handleClose();
                }
                else {
                    Swal.fire({
                        title: "Error",
                        text: "Something went wrong!",
                        icon: "error"
                    });
                }
            })
    }

    useEffect(() => {
        getFlights();
        getPlanes();
        getAirports();
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function handleDateTime(val) {
        if (val) {
            var datetime = new Date(val);
            datetime.setHours(datetime.getHours() + 5);
            var formattedDatetime = datetime.toISOString().slice(0, 16).replace("T", " ");

            return formattedDatetime;
        }
        return "";
    }
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
    return (
        <>
            <Box className="mt-8 pl-5 pr-5 mb-6">
                <Grid container direction="row" className="mb-5">
                    <Grid
                        item
                        md={10}
                        xs={9}
                        className="flex items-center xs:justify-between lg:justify-center pl-2 md:pl-16"
                    >
                        <p className="text-2xl font-bold ">
                            All Flights
                        </p>
                    </Grid>
                    <Grid item md={2} xs={3}>
                        <Button
                            sx={{
                                float: "right",
                                color: "white",
                                backgroundColor: "#4070bd !important",
                                borderRadius: 5,
                                p: 1
                            }}
                            onClick={() => setOpen(true)}
                            className="p-3 w-28 sm:w-24 md:w-40 2xl:w-48 float-right mr-6 bg-gray-500 text-white text-16 font-bold rounded-full"
                        >
                            Add New +
                        </Button>
                    </Grid>
                </Grid>

                <TableContainer
                    component={Paper}
                    sx={{ height: 500, maxHeight: 600 }}
                    className="border-2 shadow-xl rounded-2 mt-8"
                >
                    <Table stickyHeader sx={{ minWidth: 650 }}>
                        <TableHead sx={{
                            "& th": {
                                color: "white",
                                backgroundColor: "#4070bd"
                            }
                        }}>
                            <TableRow>
                                <TableCell className="bg-ar text-white">Plane</TableCell>
                                <TableCell className="bg-ar text-white">Airline</TableCell>
                                <TableCell className="bg-ar text-white">Departure Airport</TableCell>
                                <TableCell className="bg-ar text-white">Destination Airport</TableCell>
                                <TableCell className="bg-ar text-white">Airline</TableCell>
                                <TableCell className="bg-ar text-white">Departure Time</TableCell>
                                <TableCell className="bg-ar text-white">Arrival Time</TableCell>
                                <TableCell className="bg-ar text-white">Total Seats</TableCell>
                                <TableCell className="bg-ar text-white">Ticket Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData &&
                                filteredData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((x) => (
                                        <TableRow
                                            key={x.id}
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                                cursor: "pointer",
                                                height: 30,
                                            }}
                                            onClick={() => {
                                                setOpenUpdate(true);
                                                setUpdateData(x)
                                            }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {x.name}
                                            </TableCell>
                                            <TableCell>{x.airline}</TableCell>
                                            <TableCell>{x.departure_airport}</TableCell>
                                            <TableCell>{x.arrival_airport}</TableCell>
                                            <TableCell>{x.airline}</TableCell>
                                            <TableCell>{handleDateTime(x.departure_time)}</TableCell>
                                            <TableCell>{handleDateTime(x.arrival_time)}</TableCell>
                                            <TableCell>{x.total_seats}</TableCell>
                                            <TableCell>{x.ticket_price}</TableCell>
                                        </TableRow>
                                    ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={data?.length}
                    className="flex justify-end shadow-xl rounded-md"
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                width="md"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title" className="text-center font-bold">
                    <p className="text-center font-bold text-xl "> {"Add New Flight"}</p>
                </DialogTitle>
                <DialogContent>
                    <Autocomplete
                        sx={{ mt: 2 }}
                        id="country-customized-option-demo"
                        options={planesData && planesData.map((x) => x.name)}
                        onChange={(e, newValue) => {
                            const { id } = planesData.find((x) => x.name === newValue);
                            setFlightData({ ...flightData, plane_id: id })
                        }}
                        renderInput={(params) => <TextField {...params} label="Plane" />}
                    />

                    <Autocomplete
                        sx={{ mt: 2 }}
                        id="country-customized-option-demo"
                        options={airportsData && airportsData.map((x) => x.name)}
                        onChange={(e, newValue) => {
                            const { name } = airportsData.find((x) => x.name === newValue);
                            setFlightData({ ...flightData, departure_airport: name })
                        }}
                        renderInput={(params) => <TextField {...params} label="Departure Airport" />}
                    />

<Autocomplete
                        sx={{ mt: 2 }}
                        id="country-customized-option-demo"
                        options={airportsData && airportsData.map((x) => x.name)}
                        onChange={(e, newValue) => {
                            const { name } = airportsData.find((x) => x.name === newValue);
                            setFlightData({ ...flightData, arrival_airport: name })
                        }}
                        renderInput={(params) => <TextField {...params} label="Arrival Airport" />}
                    />

                    <TextField
                        sx={{ mt: 2 }}
                        onChange={(e) => setFlightData({ ...flightData, departure_time: e.target.value })}
                        fullWidth
                        type="datetime-local"
                        id="outlined-basic"
                        InputLabelProps={{
                            shrink: true
                        }}
                         inputProps={{
                                     min: getCurrentDateTime()  // Restrict previous dates
                                }}
                        label="Departure datetime"
                        variant="outline"
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        onChange={(e) => setFlightData({ ...flightData, arrival_time: e.target.value })}
                        fullWidth
                        type="datetime-local"
                        InputLabelProps={{
                            shrink: true
                        }}
                         inputProps={{
                                     min: getCurrentDateTime()  // Restrict previous dates
                                }}
                        id="outlined-basic"
                        label="Arrival datetime"
                        variant="outlined"
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        onChange={(e) => setFlightData({ ...flightData, ticket_price: e.target.value })}
                        fullWidth
                        type="number"
                        id="outlined-basic"
                        label="Ticket Price"
                        variant="outlined"
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        onChange={(e) => setFlightData({ ...flightData, total_seats: e.target.value })}
                        fullWidth
                        type="number"
                        id="outlined-basic"
                        label="Total Seats"
                        variant="outlined"
                    />
                </DialogContent>
                <Box className="flex justify-center items-center mb-4">
                    <Button variant="contained" color="secondary" sx={{ borderRadius: 10 }} onClick={handleClose}>Cancel</Button>
                    <Button
                        disabled={!flightData.plane_id || !flightData.departure_time || !flightData.arrival_time || !flightData.total_seats || !flightData.ticket_price}
                        variant="contained" color="success" sx={{ ml: 1, borderRadius: 10 }} onClick={addFlight} autoFocus>
                        Add
                    </Button>
                </Box>
            </Dialog>

            <UpdateDialog data={updateData} open={openUpdate}
                handleUpdateDialog={() => {
                    setOpenUpdate(!openUpdate);
                    getFlights();
                }}
                planes={planesData}
                airports = {airportsData}
            />
        </>
    );
}
