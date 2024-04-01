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
    const [airlineData, setAirlineData] = useState();

    useEffect(() => {
        setAirlineData(data);
    }, [data])

    async function updateAirline() {
        fetch(`${baseurl}/airline/update/${data.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "PUT",
            body: JSON.stringify(airlineData)
        }).then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Airline updated successfully!",
                    icon: "success"
                });
                setAirlineData();
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
        fetch(`${baseurl}/airline/delete/${data.id}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Airline deleted successfully!",
                    icon: "success"
                });
                setAirlineData();
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

    console.log("airlineData", airlineData)

    return (
        <Dialog
            open={open}
            onClose={() => handleUpdateDialog()}
            width="lg"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title" className="text-center font-bold">
                <p className="text-center font-bold text-xl"> {"Update Airline"}</p>
            </DialogTitle>

            <DialogContent>
                <TextField
                    sx={{ mb: 2, mt: 1 }}
                    value={airlineData?.name}
                    onChange={(e) => setAirlineData({ ...airlineData, name: e.target.value })}
                    fullWidth
                    id="outlined-basic"
                    label="Airline Name"
                    variant="outlined" />

                <TextField
                    value={airlineData?.code}
                    onChange={(e) => setAirlineData({ ...airlineData, code: e.target.value })}
                    fullWidth
                    id="outlined-basic"
                    label="Airline Code"
                    variant="outlined"
                />

                <Autocomplete
                    sx={{ mt: 2 }}
                    id="country-customized-option-demo"
                    // value={airlineData?.country}
                    options={countriesList}
                    getOptionLabel={(option) =>
                        `${option.label}`
                    }
                    onChange={(e, newValue) => setAirlineData({ ...airlineData, country: newValue.label })}
                    renderInput={(params) => <TextField {...params} label="Country" />}
                />

                <Autocomplete
                    sx={{ mt: 2 }}
                    disablePortal
                    id="combo-box-demo"
                    value={airlineData?.status ? "Active" : "In-active"}
                    onChange={(e, newValue) => newValue === "Active" ? setAirlineData({ ...airlineData, status: true }) : setAirlineData({ ...airlineData, status: false })}
                    options={["Active", "In-active"]}
                    fullWidth
                    renderInput={(params) => <TextField {...params} label="Status" />}
                />
            </DialogContent>
            <Box className="flex justify-center items-center mb-4">
                <Button variant="contained" color="secondary" sx={{ borderRadius: 10 }} onClick={() => handleUpdateDialog()}>Cancel</Button>
                <Button variant="contained" color="error" sx={{ borderRadius: 10, ml: 1 }} onClick={() => handleDelete()}>Delete</Button>
                <Button variant="contained" color="primary" sx={{ ml: 1, borderRadius: 10 }} onClick={updateAirline} autoFocus>
                    Update
                </Button>
            </Box>
        </Dialog>
    )
}
