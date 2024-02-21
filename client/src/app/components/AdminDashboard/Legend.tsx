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
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '20px' }}>
            {series.map((serie, index) => (
                <div key={index} style={{ margin: 15, display: 'flex', alignItems: 'center', }}>
                    <div style={{
                        width: 20,
                        height: 20,
                        backgroundColor: serie.color,
                        marginRight: 5,
                    }} />
                    <span>{serie.label}</span>
                </div>
            ))}
        </div>
    );
};

export default Legend