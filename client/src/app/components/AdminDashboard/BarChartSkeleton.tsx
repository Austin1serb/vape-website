import React from 'react';

const BarChartSkeleton: React.FC = () => {
    return (
        <div className="animate-pulse flex flex-col w-full h-[500px] p-4 space-y-4">
            {/* Main Chart Area */}
            <div className="flex-grow relative">
                {/* Simulate X and Y Axis Lines */}
                <div className="absolute bottom-0 left-0 w-full border-t border-gray-300"></div>
                <div className="absolute bottom-0 left-0 h-full border-r border-gray-300"></div>

                {/* Simulated Bars */}
                <div className="flex justify-between items-end h-full px-2 space-x-2">

                    <div key={0} className="w-1/6 bg-gray-300 h-full rounded"></div>
                    <div key={1} className="w-1/6 bg-gray-300 h-2/3 rounded"></div>
                    <div key={2} className="w-1/6 bg-gray-300 h-full rounded"></div>
                    <div key={3} className="w-1/6 bg-gray-300 h-1/2 rounded"></div>
                    <div key={4} className="w-1/6 bg-gray-300 h-2/3 rounded"></div>

                </div>
            </div>


        </div>
    );
};

export default BarChartSkeleton;
