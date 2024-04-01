"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Table,
    Input,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { baseurl } from "../shared/baseUrl";
import Chip from '@mui/material/Chip';

export default function AllBookedFlights(props) {

    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [bookedflightData, setBookedFlightData] = useState({
        name: "",
        code: "",
        country: "",
        status: true
    });
    const [updateData, setUpdateData] = useState();

    async function getBookedFlights() {
        const response = await fetch(`${baseurl}/bookedflights`);
        const flights = await response.json();
        setData(flights.data);
        setFilteredData(flights.data);
    }

    useEffect(() => {
        getBookedFlights();
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
                            Booked Flights
                        </p>
                        <Paper
                            className="flex items-center px-2 py-2 rounded-full shadow-md ml-6"
                            sx={{ width: 500, border: "1px solid gray", borderRadius: 10 }}
                        >
                            <SearchIcon className="ml-4" />

                            <Input
                                placeholder="Search bookedflight by name"
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
                                <TableCell className="bg-ar text-white">BookedFlight Name</TableCell>
                                <TableCell className="bg-ar text-white">BookedFlight Code</TableCell>
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
        </>
    );
}
