import * as React from 'react';
import Container from '@mui/material/Container';
import DeviceThermostatIcon from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OpacityIcon from '@mui/icons-material/Opacity';
import { fontGrid } from '@mui/material/styles/cssUtils';

function Status() {
    return (
        <Card sx={{ width: 300,
            adisplay: 'flex',
            fontFamily: 'monospace',
            backgroundColor: '#1e1e1e', 
            justifyContent: 'flex-start',
            color: '#fff' 
         }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'flex-start', flexGrow: 1 }}>
                <Typography variant="body2" color="white" sx={{fontSize: '24px'}}>
                    Device No. 3
                </Typography>
            </CardContent>
            <Divider sx={{backgroundColor: '#fff', paddingBottom: '6px', marginBottom: '10px' }} />
            <Typography variant='body2' sx={{ display: 'flex', justifyContent: 'flex-start', padding: '5px 10px'}}>
                <ThermostatIcon color='inherit' sx={{ paddingRight: '10px'}}/> {`38.5°C`}
            </Typography>
            <Typography variant='body2' sx={{ display: 'flex', justifyContent: 'flex-start', padding: '5px 10px'}}>
                <CloudUploadIcon color='inherit' sx={{ paddingRight: '10px'}}/> {`1013.25 hPa`}
            </Typography>
            <Typography variant='body2' sx={{ display: 'flex', justifyContent: 'flex-start', padding: '5px 10px 20px 10px'}}>
                <OpacityIcon color='inherit' sx={{ paddingRight: '10px'}}/> {`45%`}
            </Typography>
        </Card>
    );
}

export default Status;
