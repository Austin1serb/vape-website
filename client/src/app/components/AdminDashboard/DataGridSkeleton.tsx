// DataGridSkeleton.js
import React from 'react';

const DataGridSkeleton: React.FC = () => {
    return (
        <div className="animate-pulse">
            <div className="space-y-2">
                {/* Header Row */}
                <div className="flex justify-between bg-gray-300 p-4 rounded">
                    <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-200 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-200 rounded"></div>

                </div>
                {/* Rows */}

                <div className="flex justify-between bg-gray-100 p-4 rounded">
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>

                </div>
                <div className="flex justify-between bg-gray-100 p-4 rounded">
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>

                </div>
                <div className="flex justify-between bg-gray-100 p-4 rounded">
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>

                </div>
                <div className="flex justify-between bg-gray-100 p-4 rounded">
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>

                </div>
                <div className="flex justify-between bg-gray-100 p-4 rounded">
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-300 rounded"></div>

                </div>

            </div>
        </div>
    );
};

export default DataGridSkeleton;
