import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DeviceThermostatIcon from '@mui/material/Typography'
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import { LineChart } from '@mui/x-charts';

function Charts() {
    return (
        <LineChart
            width={500}
            height={300}
            series={[
                { data: data?.pressure, label: 'Pressure x10 [hPa]' },
                { data: data?.humidity, label: 'Humidity [%]' },
                { data: data?.temperature, label: 'Temperature [oC]' }
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}/>
    );
}

export default Charts;
