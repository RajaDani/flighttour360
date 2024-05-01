import * as React from "react";
import { Box, Typography } from "@mui/material";
import Breadcrumb from "../shared/Breadcrumb";
import AllReviews from "./AllReviews";

export default function Review() {
  return (
    <Box className="b-10 w-full -ml-10 pr-10 mt-16">
      <Breadcrumb path={"Reviews"} title={"Reviews"} />
      <AllReviews />
    </Box>
  );
}
