import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material';
import { Brand, BrandItem, Product } from '../types';
import Image from 'next/image';

const paperProps = {
    style: {
        borderRadius: '6px', // Set the border radius to 6px
    },
};

interface Props {
    open: boolean;
    product: Product;
    brands:Brand[];
    onClose: () => void;
}
const DetailsView: React.FC<Props> = ({ open, product, onClose }) => {
    function isBrandItem(brand: BrandItem | string): brand is BrandItem {
        return (brand as BrandItem)._id !== undefined;
    }
    
    return (
        <Dialog open={open} onClose={onClose} PaperProps={paperProps} className=''>
            <DialogTitle className='bg-primary-variant text-center uppercase h-18'>
                Product Details
            </DialogTitle>
            <DialogContent className='bg-dark-background border-primary-variant border-4'>
                <div className='bg-dark-surface p-4 mt-4 rounded-lg'>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Product ID:</Typography>
                                </TableCell>
                                <TableCell  >{product._id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Images:</Typography>
                                </TableCell>
                                <TableCell>    {product.imgSource && product.imgSource.map((image, index) => (
                                    <div key={index+'div'} className='h-32 w-32 relative mb-2'>
                                        <Image key={index} src={image.url}
                                            fill sizes='10vw'
                                            alt={`${product.name} ${index}`} className='rounded bg-background ' />
                                    </div>
                                ))}


                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Brand:</Typography>
                                </TableCell>

                                <TableCell>{isBrandItem(product.brand) ? product.brand.name : 'Brand ID: ' + product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Name:</Typography>
                                </TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Price:</Typography>
                                </TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Specs:</Typography>
                                </TableCell>
                                <TableCell>{product.specs}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Category:</Typography>
                                </TableCell>
                                <TableCell>{product.category.join(', ')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Description:</Typography>
                                </TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Flavor:</Typography>
                                </TableCell>
                                <TableCell>{product.flavor}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Strength:</Typography>
                                </TableCell>
                                <TableCell>{product.strength}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Featured:</Typography>
                                </TableCell>
                                <TableCell>{product.isFeatured ? 'Yes' : 'No'}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>SEO Title:</Typography>
                                </TableCell>
                                <TableCell>{product.seo?.title}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>SEO Description:</Typography>
                                </TableCell>
                                <TableCell>{product.seo?.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>SEO Keywords:</Typography>
                                </TableCell>
                                <TableCell>{product.seoKeywords.join(', ')}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Shipping Weight:</Typography>
                                </TableCell>
                                <TableCell>{product.shipping?.weight} oz</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Shipping Height:</Typography>
                                </TableCell>
                                <TableCell>{product.shipping?.dimensions.height} in</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Shipping Width:</Typography>
                                </TableCell>
                                <TableCell>{product.shipping?.dimensions.width} in</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Shipping Length:</Typography>
                                </TableCell>
                                <TableCell>{product.shipping?.dimensions.length} in</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Date Added:</Typography>
                                </TableCell>
                                <TableCell>{new Date(product.createdAt!).toLocaleString()}</TableCell>
                            </TableRow>
                            {/* Add more rows for additional fields as needed */}
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
            <DialogTitle className='bg-primary-variant text-center uppercase h-18'>
                <Button
                    onClick={onClose}
                    variant="contained"
                    color="primary"
                    fullWidth

                >
                    Close
                </Button>
            </DialogTitle>
        </Dialog>
    );
};

export default DetailsView;
