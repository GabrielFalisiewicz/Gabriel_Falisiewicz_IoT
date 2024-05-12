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

function status() {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Device No. 3
                </Typography>
            </CardContent>
            <Divider sx={{ my: 1, backgroundColor: '#fff' }} />
            <Typography variant='body2'>
                <ThermostatIcon color='action'/> {`38.5°C`}
            </Typography>
            <Typography variant='body2'>
                <CloudUploadIcon color='action'/> {`1013.25 hPa`}
            </Typography>
            <Typography variant='body2'>
                <OpacityIcon color='action'/> {`45%`}
            </Typography>
        </Card>
    );
}

export default status;
