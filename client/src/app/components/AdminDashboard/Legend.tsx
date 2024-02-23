import { Card, CardContent } from '@mui/material';
import React from 'react'

interface ChartSeriesItem {
    dataKey: string;
    label: string;
    valueFormatter: (value: number | string) => string;
    color: string;
}
interface LegendProps {
    series: ChartSeriesItem[];
}

const Legend: React.FC<LegendProps> = ({ series }) => {
    return (
        <div className='flex items-center flex-wrap justify-between text-sm text-on-dark-background mb-4'>

            {series.map((serie, index) => (
                <Card elevation={5} key={index} className=' bg-dark-surface m-2' sx={{borderRadius:2}}>
                    <CardContent className=' bg-dark-surface flex items-center'>
                    <div
                        className="w-8 h-8 rounded-lg mr-5 bg-dark-surface"
                        style={{
                            backgroundColor: serie.color,
                    
                        }} />
                    <span>{serie.label}</span>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default Legend