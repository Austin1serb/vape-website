
import ProductDetailsSkeleton from './ProductDetailsSkeleton';
const QuickViewSkeleton = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-4/5 md:w-4/5 max-h-[70vh] sm:max-h-[90vh] overflow-y-auto bg-[var(--color-background)] shadow-[2px_-2px_23px_0_rgba(0,0,0,0.75)] p-6 bg-white z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                {/* Left Side - Image & Thumbnails */}
                <div>

                    <div className="flex  mt-4 ml-16">
                        {/* Thumbnails */}
                        <div className="w-14 h-14 bg-gray-300 rounded-md mx-2"></div>
                        <div className="w-14 h-14 bg-gray-300 rounded-md mx-2"></div>
                        <div className="w-14 h-14 bg-gray-300 rounded-md mx-2"></div>
                    </div>
                    {/* Main Image */}
                    <div className="h-72 w-72 md:h-80 md:w-80  bg-gray-300 rounded-lg m-2"></div>
                </div>
                {/* Right Side - Product Details */}
                <div>
                    <ProductDetailsSkeleton />
                </div>
            </div>
        </div>
    );
};

export default QuickViewSkeleton;
