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

export default function UpdateDialog({ data, handleUpdateDialog, open, airlines }) {
    const [planeData, setPlaneData] = useState();
    const [airlineName, setAirlineName] = useState();

    useEffect(() => {
        setPlaneData(data);
        setAirlineName(data?.airline)
    }, [data])

    async function updatePlane() {
        fetch(`${baseurl}/plane/update/${data.id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "PUT",
            body: JSON.stringify(planeData)
        }).then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Plane updated successfully!",
                    icon: "success"
                });
                setPlaneData();
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
        fetch(`${baseurl}/plane/delete/${data.id}`, {
            method: "DELETE",
        }).then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    title: "Success",
                    text: "Plane deleted successfully!",
                    icon: "success"
                });
                setPlaneData();
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
                <p className="text-center font-bold text-xl"> {"Update Plane"}</p>
            </DialogTitle>

            <DialogContent>
                <TextField
                    sx={{ mb: 2, mt: 1 }}
                    value={planeData?.name}
                    onChange={(e) => setPlaneData({ ...planeData, name: e.target.value })}
                    fullWidth
                    id="outlined-basic"
                    label="Plane Name"
                    variant="outlined" />

                <TextField
                    onChange={(e) => setPlaneData({ ...planeData, total_seats: e.target.value })}
                    fullWidth
                    value={planeData?.total_seats}
                    type="number"
                    id="outlined-basic"
                    label="Total Seats"
                    variant="outlined"
                />
                <Autocomplete
                    sx={{ mt: 2 }}
                    value={airlineName}
                    id="country-customized-option-demo"
                    options={airlines && airlines.map((x) => x.name)}
                    onChange={(e, newValue) => {
                        const { id } = airlines.find((x) => x.name === newValue);
                        setPlaneData({ ...planeData, airline_id: id })
                        setAirlineName(newValue)
                    }}
                    renderInput={(params) => <TextField {...params} label="Airline" />}
                />
            </DialogContent>
            <Box className="flex justify-center items-center mb-4">
                <Button variant="contained" color="secondary" sx={{ borderRadius: 10 }} onClick={() => handleUpdateDialog()}>Cancel</Button>
                <Button variant="contained" color="error" sx={{ borderRadius: 10, ml: 1 }} onClick={() => handleDelete()}>Delete</Button>
                <Button variant="contained" color="primary" sx={{ ml: 1, borderRadius: 10 }} onClick={updatePlane} autoFocus>
                    Update
                </Button>
            </Box>
        </Dialog>
    )
}
