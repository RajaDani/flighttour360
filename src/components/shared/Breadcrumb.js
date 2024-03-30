import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Card } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function Breadcrumb(props) {
  return (
    <Card className="m-5 p-6 bg-light-subtle shadow-md rounded-lg w-full" >
      <Box className="ml-2">
        <h5 className="mb-2 font-bold">{props.title}</h5>
        <div role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            <Box className="flex items-center">
              <HomeIcon
                className="text-red-500"
              />
              <Link
                underline="hover"
                className="text-red-500 pl-2"
                href="/"
              >
                FlightTour360
              </Link>
            </Box>
            <Typography color="text.primary" >{props.path}</Typography>

          </Breadcrumbs>
        </div>
      </Box>
    </Card>

  );
}