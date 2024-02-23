import React from 'react';

interface AdminProductCardSkeletonProps {}

const AdminProductCardSkeleton: React.FC<AdminProductCardSkeletonProps> = () => {
    return (
        <div className="w-full flex flex-row bg-[var(--color-dark-surface)] rounded animate-pulse">
            <div className="flex-none w-24 h-24 bg-gray-300 overflow-hidden relative rounded-l"></div>
            <div className="flex-grow p-4 space-y-2">
                <div className="h-4 bg-gray-500 rounded w-1/2"></div> {/* Product name placeholder */}
                <div className="h-4 bg-gray-500 rounded w-1/3"></div> {/* Quantity placeholder */}
                <div className="h-4 bg-gray-500 rounded w-1/4"></div> {/* Price placeholder */}
            </div>
        </div>
    );
};

export default AdminProductCardSkeleton;
