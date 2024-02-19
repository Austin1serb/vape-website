const ProductDetailsSkeleton = () => {
    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-300 rounded w-52"></div>
                <div className="w-11 h-11 bg-gray-300 rounded-full"></div>
            </div>
            <div className="border-b border-gray-200 w-full mb-4"></div>
            <div className="h-64 mb-4">
                <div className="relative overflow-hidden h-48 bg-gray-300 rounded mb-4"></div>
            </div>
            <div className="h-7 bg-gray-300 rounded w-3/5 mb-4"></div>
            <div className="flex flex-col sm:flex-row justify-between w-full mb-4">
                <div className="h-14 bg-gray-300 rounded w-full sm:w-24 mb-2 sm:mb-0"></div>
                <div className="h-14 bg-gray-300 rounded w-full"></div>
            </div>
            <div className="h-14 bg-gray-300 rounded w-full"></div>
        </>
    );
};

export default ProductDetailsSkeleton;
