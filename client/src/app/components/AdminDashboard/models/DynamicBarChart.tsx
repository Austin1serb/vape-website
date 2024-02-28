
import React from 'react';
import { BarChart as MuiBarChart } from '@mui/x-charts';
import { Typography } from '@mui/material';

interface BarChartProps {
    salesData: any;
    chartSeries: any;
    chartSetting: any;
}
const DynamicBarChart: React.FC<BarChartProps> = ({ salesData, chartSeries, chartSetting }) => {
    // Determine if there's enough data to display the chart
    const hasEnoughData = salesData && salesData.length > 0; // Adjust condition as needed

    return hasEnoughData ? (
        <MuiBarChart
            dataset={salesData}
            xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
            slotProps={{
                legend: {
                    hidden: true,
                },
            }}
            series={chartSeries}
            {...chartSetting}
        />
    ) : (
        // Display a placeholder with a message when there's not enough data
        <div className='p-8 w-full text-center'>
            <Typography variant="subtitle1">Not enough data</Typography>
            <Typography color={'var(--color-blue)'} variant="subtitle2">minimum 1 month sales data</Typography>
        </div>
    );
};

export default DynamicBarChart;
