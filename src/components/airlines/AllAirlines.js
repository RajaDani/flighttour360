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

export default function AllAirlines(props) {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [airlineData, setAirlineData] = useState({
        name: "",
        code: "",
        country: "",
        status: true
    });
    const [updateData, setUpdateData] = useState();

    async function getAirlines() {
        const response = await fetch(`${baseurl}/airlines`);
        const flights = await response.json();
        setData(flights.data);
        setFilteredData(flights.data);
    }

    async function addAirline() {
        await fetch(`${baseurl}/airline/add`,
            {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(airlineData)
            }).then((res) => {
                if (res.status === 200) {
                    Swal.fire({
                        title: "Success",
                        text: "Airline added successfully!",
                        icon: "success"
                    });
                    getAirlines()
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
                            All Airlines
                        </p>
                        <Paper
                            className="flex items-center px-2 py-2 rounded-full shadow-md ml-6"
                            sx={{ width: 500, border: "1px solid gray", borderRadius: 10 }}
                        >
                            <SearchIcon className="ml-4" />

                            <Input
                                placeholder="Search airline by name"
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
                                <TableCell className="bg-ar text-white">Airline Name</TableCell>
                                <TableCell className="bg-ar text-white">Airline Code</TableCell>
                                <TableCell className="bg-ar text-white">Country</TableCell>
                                <TableCell className="bg-ar text-white">Status</TableCell>
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
                                            <TableCell>{x.code}</TableCell>
                                            <TableCell>{x.country}</TableCell>
                                            <TableCell>{<Chip color={x?.status ? "success" : "warning"} label={x?.status ? "Active" : "In-active"} />}</TableCell>
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
                    <p className="text-center font-bold text-xl "> {"Add New Airline"}</p>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        sx={{ mt: 1 }}
                        onChange={(e) => setAirlineData({ ...airlineData, name: e.target.value })}
                        fullWidth
                        id="outlined-basic"
                        label="Airline Name"
                        variant="outlined"
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        onChange={(e) => setAirlineData({ ...airlineData, code: e.target.value })}
                        fullWidth
                        id="outlined-basic"
                        label="Airline Code"
                        variant="outlined"
                    />
                    <Autocomplete
                        sx={{ mt: 2 }}
                        id="country-customized-option-demo"
                        options={countriesList}
                        getOptionLabel={(option) =>
                            `${option.label}`
                        }
                        onChange={(e, newValue) => setAirlineData({ ...airlineData, country: newValue.label })}
                        renderInput={(params) => <TextField {...params} label="Country" />}
                    />
                </DialogContent>
                <Box className="flex justify-center items-center mb-4">
                    <Button variant="contained" color="secondary" sx={{ borderRadius: 10 }} onClick={handleClose}>Cancel</Button>
                    <Button
                        disabled={!airlineData.name || !airlineData.code || !airlineData.country}
                        variant="contained" color="success" sx={{ ml: 1, borderRadius: 10 }} onClick={addAirline} autoFocus>
                        Add
                    </Button>
                </Box>
            </Dialog>

            <UpdateDialog data={updateData} open={openUpdate}
                handleUpdateDialog={() => {
                    setOpenUpdate(!openUpdate);
                    getAirlines();
                }} />
        </>
    );
}
