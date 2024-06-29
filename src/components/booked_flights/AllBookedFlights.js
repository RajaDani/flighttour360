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
    Button,
    TableSortLabel,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { baseurl } from "../shared/baseUrl";
import Chip from '@mui/material/Chip';
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import TawkToDashboard from "../chat/TawkTo";

export default function AllBookedFlights(props) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('');

    async function getBookedFlights() {
        const response = await fetch(`${baseurl}/booked/flights`);
        const flights = await response.json();
        setData(flights.data);
        setFilteredData(flights.data);
    }

    useEffect(() => {
        getBookedFlights();
    }, []);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const filter = data.filter((x) => x.customer.toLowerCase().includes(searchText.toLowerCase()));
        setFilteredData(filter);
    }, [searchText, data]);

    const handleDateTime = (val) => {
        var datetime = new Date(val);
        datetime.setHours(datetime.getHours() + 5);
        var formattedDatetime = datetime.toISOString().slice(0, 16).replace("T", " ");
        return formattedDatetime;
    };

    const saveExcel = async (type, data) => {
        if (data && type) {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet("Booked Flights");

            const headers = [
                "#",
                "Plane",
                "Airline",
                "Customer",
                "Departure Datetime",
                "Arrival Datetime",
                "Seats Booked",
                "Total Amount",
            ];
            worksheet.addRow(headers);

            // Add data rows
            data.forEach((x, index) => {
                const rowData = [
                    index + 1,
                    x.plane,
                    x.airline,
                    x.customer,
                    handleDateTime(x.departure_time),
                    handleDateTime(x.arrival_time),
                    x.seats_booked,
                    x.total_amount,
                ];
                worksheet.addRow(rowData);
            });

            const buffer = await workbook.xlsx.writeBuffer();
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            // Use FileSaver to trigger the file download
            saveAs(blob, `Booked Flights.${type}`);
        }
    };

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    };

    const sortedData = stableSort(filteredData, getComparator(order, orderBy));

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
                    <Grid item md={2} xs={3}>
                        <Button
                            sx={{
                                float: "right",
                                color: "white",
                                backgroundColor: "#4070bd !important",
                                borderRadius: 5,
                                p: 1
                            }}
                            onClick={() => saveExcel('xls', filteredData)}
                            className="p-3 w-28 sm:w-24 md:w-40 2xl:w-48 float-right mr-6 bg-gray-500 text-white text-16 font-bold rounded-full"
                        >
                            Export
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
                                {['plane', 'airline', 'customer', 'departure_time', 'arrival_time', 'seats_booked', 'total_amount'].map((headCell) => (
                                    <TableCell
                                        key={headCell}
                                        sortDirection={orderBy === headCell ? order : false}
                                    >
                                        <TableSortLabel
                                            active={orderBy === headCell}
                                            direction={orderBy === headCell ? order : 'asc'}
                                            onClick={() => handleRequestSort(headCell)}
                                        >
                                            {headCell.replace('_', ' ').toUpperCase()}
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData &&
                                sortedData
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
         {/* <TawkToDashboard/> */}
            </Box>
        </>
    );
}
