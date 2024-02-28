
import React, { useState } from 'react';
import BrandCard from './models/BrandCard';
import { Button, Grid } from '@mui/material';
import { Brand } from '../types';
import AddBrandModal from './models/AddBrandModal';
import { postData, putData } from './api/route';

interface BrandListProps {
    initialBrands: Brand[];
}

const BrandList: React.FC<BrandListProps> = ({ initialBrands }) => {
    const [brands, setBrands] = useState<Brand[]>(initialBrands);
    const [open, setOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    const handleOpenEdit = (brand: React.SetStateAction<Brand | null>) => {
        setIsEditModalOpen(true);
        setSelectedBrand(brand);
        handleOpen();
    }

    const handleCloseEdit = () => {
        setIsEditModalOpen(false);
        setSelectedBrand(null);
        handleClose();
    }


    // Inside BrandList component
    const handleAddBrand = async (brandData: Brand) => {
        setBrands([...brands, brandData]);
        handleClose();
    };

    const handleUpdateBrand = async (brandData: Brand) => {
        setBrands((prevBrands) => {
            return prevBrands.map((brand) =>
                brand._id === brandData._id ?
                    brandData : brand

            );
        })
    }



    const handleDeleteBrand = (brandId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this brand?');

        if (confirmDelete) {
            fetch(`http://localhost:8000/api/brand/${brandId}`, {
                credentials: 'include',
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) {
                        const updatedbrands = brands.filter((brand) => brand._id !== brandId);
                        setBrands(updatedbrands);
                    } else {
                        console.error('Error deleting brand:', response.statusText);
                    }
                })
                .catch((error) => {
                    console.error('Error deleting brand:', error);
                });
        }
    };

    return (
        <div className="m-5 rounded-lg pb-12" >
            <div className='flex justify-between items-center'>
                <h3 className='text-3xl text-start uppercase py-8 ml-8 '>Brand Management</h3>
                <div>
                    <Button variant="contained" color="primary" onClick={handleOpen}>
                        Add Brand
                    </Button>
                </div>
            </div>
            {/*<BrandCard brand={brands} />*/}
            <Grid container spacing={2}>
                {/* commented out for now */}
                {/*{brands.map((brand) => (
                <Grid item xs={12} sm={6} md={4} key={brand._id}>
              
                </Grid>
            ))}*/}
            </Grid>

            {open && (
                <AddBrandModal
                    open={open || isEditModalOpen} 
                    onClose={handleCloseEdit}
                    selectedBrand={selectedBrand}
                    onUpdateBrand={handleAddBrand}
                    onAddBrand={handleUpdateBrand} />

            )}


        </div>
    );
};

export default BrandList;
