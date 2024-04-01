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

export default function UpdateDialog({ data, handleUpdateDialog, open }) {
    const [airportData, setAirportData] = useState();

    useEffect(() => {
        setAirportData(data);
    }, [data])

    async function updateAirport() {
        fetch(`${baseurl}/airport/update/${data.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "PUT",
            body: JSON.stringify(airportData)
        }).then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Airport updated successfully!",
                    icon: "success"
                });
                setAirportData();
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
        fetch(`${baseurl}/airport/delete/${data.id}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Airport deleted successfully!",
                    icon: "success"
                });
                setAirportData();
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
                <p className="text-center font-bold text-xl"> {"Update Airport"}</p>
            </DialogTitle>

            <DialogContent>
                <TextField
                    sx={{ mb: 2, mt: 1 }}
                    value={airportData?.name}
                    onChange={(e) => setAirportData({ ...airportData, name: e.target.value })}
                    fullWidth
                    id="outlined-basic"
                    label="Airline Name"
                    variant="outlined" />

                <TextField
                    sx={{ mt: 2 }}
                    value={airportData?.code}
                    onChange={(e) => setAirportData({ ...airportData, code: e.target.value })}
                    fullWidth
                    id="outlined-basic"
                    label="Airline Code"
                    variant="outlined"
                />

                <Autocomplete
                    sx={{ mt: 2 }}
                    id="country-customized-option-demo"
                    value={airportData?.country}
                    options={countriesList}
                    getOptionLabel={(option) =>
                        `${option.label}`
                    }
                    onChange={(e, newValue) => setAirportData({ ...airportData, country: newValue.label })}
                    renderInput={(params) => <TextField {...params} label="Country" />}
                />

                <TextField
                    sx={{ mt: 2 }}
                    onChange={(e) => setAirportData({ ...airportData, city: e.target.value })}
                    fullWidth
                    id="outlined-basic"
                    label="City"
                    variant="outlined"
                />
                <TextField
                    sx={{ mt: 2 }}
                    onChange={(e) => setAirportData({ ...airportData, address: e.target.value })}
                    fullWidth
                    id="outlined-basic"
                    label="Address"
                    multiline
                    rows={2}
                    variant="outlined"
                />
                <TextField
                    sx={{ mt: 2 }}
                    onChange={(e) => setAirportData({ ...airportData, phone: e.target.value })}
                    fullWidth
                    id="outlined-basic"
                    label="Airport Contact"
                    type="number"
                    variant="outlined"
                />

                <Autocomplete
                    disablePortal
                    sx={{ mt: 2 }}
                    id="combo-box-demo"
                    value={airportData?.status ? "Active" : "In-active"}
                    onChange={(e, newValue) => newValue === "Active" ? setAirportData({ ...airportData, status: true }) : setAirportData({ ...airportData, status: false })}
                    options={["Active", "In-active"]}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label="Status" />}
                />
            </DialogContent>
            <Box className="flex justify-center items-center mb-4">
                <Button variant="contained" color="secondary" sx={{ borderRadius: 10 }} onClick={() => handleUpdateDialog()}>Cancel</Button>
                <Button variant="contained" color="error" sx={{ borderRadius: 10, ml: 1 }} onClick={() => handleDelete()}>Delete</Button>
                <Button variant="contained" color="primary" sx={{ ml: 1, borderRadius: 10 }} onClick={updateAirport} autoFocus>
                    Update
                </Button>
            </Box>
        </Dialog>
    )
}
