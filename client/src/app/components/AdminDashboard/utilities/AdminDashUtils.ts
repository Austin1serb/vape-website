export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export interface AggregatedData {
    [monthKey: string]: {
        [productId: string]: {
            totalQuantity: number;
            totalAmount: number;
            name?: string; // Assuming 'name' might be part of the data
        };
    };
}

export interface TransformedDataItem {
    month: string;
    [productName: string]: number | string; // For storing totalAmount or any other metric for each product
}
export interface SaleItem {
    month: number | string;
    productId: string;
    totalQuantity: number;
    totalAmount: number;
}

export const aggregateSalesData = (data: SaleItem[]): AggregatedData => {
    const aggregatedData: AggregatedData = {};

    data.forEach(item => {
        const monthKey = `month_${item.month}`;
        if (!aggregatedData[monthKey]) {
            aggregatedData[monthKey] = {};
        }
        if (!aggregatedData[monthKey][item.productId]) {
            aggregatedData[monthKey][item.productId] = { ...item, totalQuantity: 0, totalAmount: 0 };
        }
        aggregatedData[monthKey][item.productId].totalQuantity += item.totalQuantity;
        aggregatedData[monthKey][item.productId].totalAmount += item.totalAmount;
    });

    return aggregatedData;
};

export const transformAndSortDataForChart = (aggregatedData: AggregatedData): TransformedDataItem[] => {
    const transformedData: { [monthKey: string]: TransformedDataItem } = {};
    let previousMonthProducts = new Set<string>(); // To keep track of product names from the previous month

    Object.keys(aggregatedData).forEach(monthKey => {
        const monthNumber = parseInt(monthKey.split('_')[1], 10);
        const monthName = monthNames[monthNumber - 1]; // Convert month number to month name
        const products = Object.values(aggregatedData[monthKey]);

        // Assuming products have a 'name' property for sorting
        products.sort((a, b) => b.totalAmount - a.totalAmount); // Sort by totalAmount

        // Initialize month data
        transformedData[monthKey] = { month: monthName };

        let currentMonthProducts = new Set<string>(); // To keep track of product names for the current month

        if (products.length > 0) {
            // Process existing products
            const topProducts = products.slice(0, 4); // Select top 4 products
            topProducts.forEach((product) => {
                const productNameKey = product.name || 'Unknown Product'; // Fallback to 'Unknown Product' if name is not available
                transformedData[monthKey][productNameKey] = product.totalAmount; // Or totalQuantity
                currentMonthProducts.add(productNameKey);
            });
        }

        // Add missing products from the previous month with totalAmount 0
        previousMonthProducts.forEach(productName => {
            if (!currentMonthProducts.has(productName)) {
                transformedData[monthKey][productName] = 0;
            }
        });

        // Update previousMonthProducts for the next iteration
        previousMonthProducts = new Set([...currentMonthProducts]);
    });

    return Object.values(transformedData);
};



export const formatDate = (dateString: string): string => {
    if (dateString) {
        const date = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    } else {
        return 'Date Not Found';
    }
};
