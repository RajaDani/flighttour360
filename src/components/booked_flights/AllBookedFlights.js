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

    async function getBookedFlights() {
        const response = await fetch(`${baseurl}/booked/flights`);
        const flights = await response.json();
        setData(flights.data);
        setFilteredData(flights.data);
    }

    useEffect(() => {
        getBookedFlights();
    }, [])


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const filter = data.filter((x) => x.customer.toLowerCase().includes(searchText.toLocaleLowerCase()));
        setFilteredData(filter);
    }, [searchText])

    function handleDateTime(val) {
        var datetime = new Date(val);
        datetime.setHours(datetime.getHours() + 5);
        var formattedDatetime = datetime.toISOString().slice(0, 16).replace("T", " ");

        return formattedDatetime;
    }

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
                                placeholder="Search by user name"
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
                                <TableCell className="bg-ar text-white">Plane</TableCell>
                                <TableCell className="bg-ar text-white">Airline</TableCell>
                                <TableCell className="bg-ar text-white">Customer</TableCell>
                                <TableCell className="bg-ar text-white">Departure Datetime</TableCell>
                                <TableCell className="bg-ar text-white">Arrival Datetime</TableCell>
                                <TableCell className="bg-ar text-white">Seats Booked</TableCell>
                                <TableCell className="bg-ar text-white">Total Amount</TableCell>
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
                                        >
                                            <TableCell component="th" scope="row">
                                                {x.plane}
                                            </TableCell>
                                            <TableCell>{x.airline}</TableCell>
                                            <TableCell>{x.customer}</TableCell>
                                            <TableCell>{handleDateTime(x.departure_time)}</TableCell>
                                            <TableCell>{handleDateTime(x.arrival_time)}</TableCell>
                                            <TableCell>{x.seats_booked}</TableCell>
                                            <TableCell>{x.total_amount}</TableCell>
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
