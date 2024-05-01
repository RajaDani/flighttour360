

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
  TablePagination,
} from "@mui/material";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { baseurl } from "../shared/baseUrl";

export default function AllReviews() {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  async function getReviews() {
    const response = await fetch(`${baseurl}/reviews`);
    const reviews = await response.json();
    setData(reviews.data);
    setFilteredData(reviews.data);
  }

  useEffect(() => {
    getReviews()
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <Box className="mt-8 pl-5 pr-5 mb-6">

      <Box className="flex justify-center items-center mb-2 zoomLevel">
        {/* <ReviewsIcon className="text-ar" sx={{ fontSize: 35 }} /> */}
        <p className="text-2xl font-bold ">
          Reviews
        </p>
      </Box>


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
              <TableCell className="bg-ar text-white">Sr #</TableCell>
              <TableCell className="bg-ar text-white">Customer </TableCell>
              <TableCell className="bg-ar text-white">Review Message</TableCell>
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
                      {x.id}
                    </TableCell>
                    <TableCell>{x.user_name}</TableCell>
                    <TableCell>{x.message}</TableCell>
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
  );
}
