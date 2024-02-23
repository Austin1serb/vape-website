import React from 'react';
import BarChartSkeleton from './BarChartSkeleton';

const SalesOverviewSkeleton: React.FC = () => {
    return (
        <div className="m-5 rounded-lg animate-pulse bg-dark-surface text-on-dark-background w-full">
            {/* Title Skeleton */}
            <div className="py-3 text-center">
                <div className="h-8 bg-gray-500 rounded-md w-1/2 mx-auto"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {/* Summary Widgets Skeleton */}

                <div className="bg-dark-surface text-on-dark-background rounded-lg p-4">
                    <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-500 rounded w-1/2"></div>
                </div>
                <div className="bg-dark-surface text-on-dark-background rounded-lg p-4">
                    <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-500 rounded w-1/2"></div>
                </div>
                <div className="bg-dark-surface text-on-dark-background rounded-lg p-4">
                    <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-500 rounded w-1/2"></div>
                </div>
                <div className="bg-dark-surface text-on-dark-background rounded-lg p-4">
                    <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-500 rounded w-1/2"></div>
                </div>
                <div className="bg-dark-surface text-on-dark-background rounded-lg p-4">
                    <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-500 rounded w-1/2"></div>
                </div>
                <div className="bg-dark-surface text-on-dark-background rounded-lg p-4">
                    <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-500 rounded w-1/2"></div>
                </div>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 mt-4">
                {/* Customer Registrations & Guest Information Skeleton */}
                <div >
                    <div className="flex flex-row justify-between bg-dark-surface text-on-dark-background rounded-lg p-4">
                        {/* First Box */}
                        <div className="bg-dark-surface text-on-dark-background rounded-lg p-4 w-1/2 mr-2">
                            <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
                            <div className="h-6 bg-gray-500 rounded w-1/2"></div>
                        </div>

                        {/* Second Box */}
                        <div className="bg-dark-surface text-on-dark-background rounded-lg p-4 w-1/2 ml-2">
                            <div className="h-4 bg-gray-500 rounded w-3/4 mb-2"></div>
                            <div className="h-6 bg-gray-500 rounded w-1/2"></div>
                        </div>
                    </div>

                </div>
                {/* Latest Orders Skeleton */}
                <div className="bg-dark-surface text-on-dark-background rounded-lg p-4 ">
                    <div className="flex flex-wrap justify-center w-full">

                        <div className="h-8 bg-gray-500 rounded w-1/2 m-2"></div>
                        <div className="h-8 bg-gray-500 rounded w-1/3 m-2"></div>
                        <div className="h-8 bg-gray-500 rounded w-1/3 m-2"></div>
                        <div className="h-8 bg-gray-500 rounded w-1/2 m-2"></div>

                    </div>
                </div>
            </div>
            {/* Chart Title Skeleton */}
            <div className="mt-10 py-3 text-center">
                <div className="h-8 bg-gray-500 rounded-md w-1/3 mx-auto"></div>
            </div>
            {/* Chart Skeleton */}
            <div>
            <BarChartSkeleton />
            </div>
        </div>
    );
};

export default SalesOverviewSkeleton;
