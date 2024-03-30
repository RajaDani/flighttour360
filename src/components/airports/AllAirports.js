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
    InputAdornment,
    TextField,
    TablePagination,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function AllAirports(props) {
    // const router = useRouter();
    // const pathname = usePathname();

    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);

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
                            All Airports
                        </p>
                        <Paper
                            className="flex items-center px-2 py-2 rounded-full shadow-md ml-6"
                            sx={{ width: 500, border: "1px solid gray", borderRadius: 10 }}
                        >
                            <SearchIcon className="ml-4" />

                            <Input
                                placeholder="Search airport by name"
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
                                borderRadius: 5
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
                        <TableHead sx={{ backgroundColor: "blue" }}>
                            <TableRow >
                                <TableCell className="bg-ar text-white">Name</TableCell>
                                <TableCell className="bg-ar text-white">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data &&
                                data
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
                                                {x.name}
                                            </TableCell>
                                            <TableCell>{x.status}</TableCell>
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
                    <p className="text-center font-bold text-xl"> {"Add New Airline"}</p>
                </DialogTitle>
                <DialogContent>
                    <TextField fullWidth id="outlined-basic" label="Airline Name" variant="outlined" />
                </DialogContent>
                <Box className="flex justify-center items-center mb-4">
                    <Button variant="contained" color="secondary" sx={{ borderRadius: 2 }} onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="success" sx={{ ml: 1, borderRadius: 2 }} onClick={handleClose} autoFocus>
                        Add
                    </Button>
                </Box>
            </Dialog>
        </>
    );
}
