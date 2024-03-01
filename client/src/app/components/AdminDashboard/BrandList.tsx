
import React, {useState } from 'react';
import { Button, Grid } from '@mui/material';
import { Brand } from '../types';
import AddBrandModal from './models/AddBrandModal';
import AdminBrandCard from './models/AdminBrandCard';


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
                <h3 className='text-3xl text-start uppercase py-8 ml-8 w-20'>Brand Management</h3>
                <div>
                    <Button variant="contained" color="success" onClick={handleOpen}>
                        Add Brand
                    </Button>
                </div>
            </div>


            <Grid container spacing={2} >

                {brands.map((brand) =>
                    <Grid key={brand._id} item xs={12}>
                        <AdminBrandCard
                            key={brand.name}
                            brand={brand}
                            handleEdit={handleOpenEdit}
                            handleDelete={handleDeleteBrand}
                        />
                    </Grid>
                )}
            </Grid>

            {open && (
                <AddBrandModal
                    open={open || isEditModalOpen}
                    onClose={handleCloseEdit}
                    selectedBrand={selectedBrand}
                    onAddBrand={handleAddBrand}
                    onUpdateBrand={handleUpdateBrand} />

            )}


        </div>
    );
};

export default BrandList;
