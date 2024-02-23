// DataGridSkeleton.js
import React from 'react';

const DataGridSkeleton: React.FC = () => {
    return (
        <div className="animate-pulse bg-dark-background text-on-dark-background ">
            <div className="space-y-2">
              
                {/* Header Row */}
                <div className="flex justify-between p-4 rounded bg-dark-surface text-on-dark-background ">

                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>

                </div>
                {/* Rows */}

                <div className="flex justify-between bg-dark-surface text-on-dark-background  p-4 rounded">
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>

                </div>
                <div className="flex justify-between bg-dark-surface text-on-dark-background  p-4 rounded">
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>

                </div>
                <div className="flex justify-between bg-dark-surface text-on-dark-background  p-4 rounded">
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>

                </div>
                <div className="flex justify-between bg-dark-surface text-on-dark-background  p-4 rounded">
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>

                </div>
                <div className="flex justify-between bg-dark-surface text-on-dark-background  p-4 rounded">
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>
                    <div className="w-1/5 h-4 bg-gray-500 rounded"></div>

                </div>

            </div>
        </div>
    );
};

export default DataGridSkeleton;
