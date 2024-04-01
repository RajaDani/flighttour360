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
import Chip from '@mui/material/Chip';

export default function AllPlanes(props) {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [planeData, setPlaneData] = useState({
        name: "",
        total_seats: "",
        airline_id: "",
    });
    const [updateData, setUpdateData] = useState();
    const [airlinesData, setAirlinesData] = useState();

    async function getPlanes() {
        const response = await fetch(`${baseurl}/planes`);
        const planes = await response.json();
        setData(planes.data);
        setFilteredData(planes.data);
    }

    async function getAirlines() {
        const response = await fetch(`${baseurl}/airlines`);
        const flights = await response.json();
        setAirlinesData(flights.data);
    }

    async function addPlane() {
        await fetch(`${baseurl}/plane/add`,
            {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(planeData)
            }).then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        title: "Success",
                        text: "Plane added successfully!",
                        icon: "success"
                    });
                    getPlanes()
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
        getPlanes();
        getAirlines();
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

    useEffect(() => {
        const filter = data.filter((x) => x.name.toLowerCase().includes(searchText.toLocaleLowerCase()));
        setFilteredData(filter);
    }, [searchText])

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
                            All Planes
                        </p>
                        <Paper
                            className="flex items-center px-2 py-2 rounded-full shadow-md ml-6"
                            sx={{ width: 500, border: "1px solid gray", borderRadius: 10 }}
                        >
                            <SearchIcon className="ml-4" />

                            <Input
                                placeholder="Search plane by name"
                                className="flex flex-1 mx-8"
                                disableUnderline
                                fullWidth
                                value={searchText}
                                inputProps={{
                                    "aria-label": "Search",
                                }}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </Paper>
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
                                <TableCell className="bg-ar text-white">Plane Name</TableCell>
                                <TableCell className="bg-ar text-white">Total Seats</TableCell>
                                <TableCell className="bg-ar text-white">Airline</TableCell>
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
                                            <TableCell>{x.total_seats}</TableCell>
                                            <TableCell>{x.airline}</TableCell>
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
                    <p className="text-center font-bold text-xl "> {"Add New Plane"}</p>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        sx={{ mt: 1 }}
                        onChange={(e) => setPlaneData({ ...planeData, name: e.target.value })}
                        fullWidth
                        id="outlined-basic"
                        label="Plane Name"
                        variant="outlined"
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        onChange={(e) => setPlaneData({ ...planeData, total_seats: e.target.value })}
                        fullWidth
                        type="number"
                        id="outlined-basic"
                        label="Total Seats"
                        variant="outlined"
                    />
                    <Autocomplete
                        sx={{ mt: 2 }}
                        id="country-customized-option-demo"
                        options={airlinesData && airlinesData.map((x) => x.name)}
                        onChange={(e, newValue) => {
                            const { id } = airlinesData.find((x) => x.name === newValue);
                            setPlaneData({ ...planeData, airline_id: id })
                        }}
                        renderInput={(params) => <TextField {...params} label="Airline" />}
                    />

                </DialogContent>
                <Box className="flex justify-center items-center mb-4">
                    <Button variant="contained" color="secondary" sx={{ borderRadius: 10 }} onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="success" sx={{ ml: 1, borderRadius: 10 }} onClick={addPlane} autoFocus>
                        Add
                    </Button>
                </Box>
            </Dialog>

            <UpdateDialog data={updateData} open={openUpdate}
                handleUpdateDialog={() => {
                    setOpenUpdate(!openUpdate);
                    getPlanes();
                }}
                airlines={airlinesData}
            />
        </>
    );
}
