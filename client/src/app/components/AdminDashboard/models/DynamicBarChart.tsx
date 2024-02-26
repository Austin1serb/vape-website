
import React from 'react';
import { BarChart as MuiBarChart } from '@mui/x-charts';

interface BarChartProps {
    salesData: any;
    chartSeries: any;
    chartSetting: any;
}

const DynamicBarChart: React.FC<BarChartProps> = ({ salesData, chartSeries, chartSetting }) => {
    return (
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
    );
};

export default DynamicBarChart;
