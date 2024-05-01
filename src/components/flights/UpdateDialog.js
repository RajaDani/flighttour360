import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Swal from 'sweetalert2'
import { useState, useEffect } from "react";
import {
    Button,
    Box,
    TextField,
    Autocomplete
} from "@mui/material";
import { baseurl } from '../shared/baseUrl';
import { countriesList } from '../shared/countryList';

export default function UpdateDialog({ data, handleUpdateDialog, open, planes,airports }) {
    const [flightData, setFlightData] = useState();
    const [planeName, setPlaneName] = useState("");
    const [daName, setDAName] = useState("");
    const [aaName, setAAName] = useState("");

    useEffect(() => {
        setFlightData(data);
        setPlaneName(data?.name);
        setDAName(data?.departure_airport);
        setAAName(data?.arrival_airport);
    }, [data])

    async function updateFlight() {
        fetch(`${baseurl}/flight/update/${data.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "PUT",
            body: JSON.stringify(flightData)
        }).then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Flight updated successfully!",
                    icon: "success"
                });
                setFlightData();
                handleUpdateDialog()
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

    async function handleDelete() {
        fetch(`${baseurl}/flight/delete/${data.id}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Flight deleted successfully!",
                    icon: "success"
                });
                setFlightData();
                handleUpdateDialog()
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

    return (
        <Dialog
            open={open}
            onClose={() => handleUpdateDialog()}
            width="lg"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title" className="text-center font-bold">
                <p className="text-center font-bold text-xl"> {"Update Flight"}</p>
            </DialogTitle>

            <DialogContent>
                <Autocomplete
                    sx={{ mt: 2 }}
                    id="country-customized-option-demo"
                    value={planeName}
                    options={planes && planes.map((x) => x.name)}
                    onChange={(e, newValue) => {
                        const { id } = planes.find((x) => x.name === newValue);
                        setFlightData({ ...flightData, plane_id: id })
                        setPlaneName(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} label="Plane" />}
                />
                <Autocomplete
                        sx={{ mt: 2 }}
                        value={daName}
                        id="country-customized-option-demo"
                        options={airports && airports.map((x) => x.name)}
                        onChange={(e, newValue) => {
                            const { name } = airports.find((x) => x.name === newValue);
                            setFlightData({ ...flightData, departure_airport: name })
                        }}
                        renderInput={(params) => <TextField {...params} label="Departure Airport" />}
                    />

<Autocomplete
                        sx={{ mt: 2 }}
                        value={aaName}
                        id="country-customized-option-demo"
                        options={airports && airports.map((x) => x.name)}
                        onChange={(e, newValue) => {
                            const { name } = planes.find((x) => x.name === newValue);
                            setFlightData({ ...flightData, arrival_airport: name })
                        }}
                        renderInput={(params) => <TextField {...params} label="Arrival Airport" />}
                    />
                <TextField
                    sx={{ mt: 2 }}
                    value={flightData?.departure_time}
                    onChange={(e) => setFlightData({ ...flightData, departure_time: e.target.value })}
                    fullWidth
                    type="datetime-local"
                    id="outlined-basic"
                    label="Departure datetime"
                    variant="outlined"
                />
                <TextField
                    sx={{ mt: 2 }}
                    value={flightData?.arrival_time}
                    onChange={(e) => setFlightData({ ...flightData, arrival_time: e.target.value })}
                    fullWidth
                    type="datetime-local"
                    id="outlined-basic"
                    label="Arrival datetime"
                    variant="outlined"
                />
                <TextField
                    sx={{ mt: 2 }}
                    value={flightData?.ticket_price}
                    onChange={(e) => setFlightData({ ...flightData, ticket_price: e.target.value })}
                    fullWidth
                    type="number"
                    id="outlined-basic"
                    label="Ticket Price"
                    variant="outlined"
                />
                <TextField
                    sx={{ mt: 2 }}
                    value={flightData?.total_seats}
                    onChange={(e) => setFlightData({ ...flightData, total_seats: e.target.value })}
                    fullWidth
                    type="number"
                    id="outlined-basic"
                    label="Total Seats"
                    variant="outlined"
                />
            </DialogContent>
            <Box className="flex justify-center items-center mb-4">
                <Button variant="contained" color="secondary" sx={{ borderRadius: 10 }} onClick={() => handleUpdateDialog()}>Cancel</Button>
                <Button variant="contained" color="error" sx={{ borderRadius: 10, ml: 1 }} onClick={() => handleDelete()}>Delete</Button>
                <Button variant="contained" color="primary" sx={{ ml: 1, borderRadius: 10 }} onClick={updateFlight} autoFocus>
                    Update
                </Button>
            </Box>
        </Dialog>
    )
}
