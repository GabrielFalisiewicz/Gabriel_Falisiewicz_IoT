import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DeviceThermostatIcon from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';

const pages = 'Device No.';

function status() {
    return (
        <Box
        height={200}
        width={200}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
      >
        <p>{pages} 0</p>
        <Divider orientation="horizontal" flexItem style={{borderWidth: 2, borderColor: 'white'}} />
        {/* {hasData && <Typography style={{paddingTop: '10px'}} component="div">
            <Typography variant="h6" component="div">
            <DeviceThermostatIcon></DeviceThermostatIcon>
            <span className="value">{data?.temperature}</span> <span>&deg;C</span>
        </Typography>
        <Typography variant="h6" component="div">
            <CloudUploadIcon></CloudUploadIcon>
            <span className="value">{data?.pressure}</span> hPa
        </Typography>
        <Typography variant="h6" component="div">
            <OpacityIcon></OpacityIcon>
            <span className="value">{data?.humidity}</span>%
        </Typography>
        </Typography>} */}
      </Box>
    );
}

export default status;
