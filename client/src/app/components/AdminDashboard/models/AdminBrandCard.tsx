import React, { useState } from 'react';
import { Typography, Chip, Rating, Button, Collapse, IconButton } from '@mui/material';

import BrandImage from '@/utils/BrandImage';
import { Brand } from '@/components/types';
import Icon from '@/components/Icon';


interface AdminBrandCardProps {
    brand: Brand;
    handleEdit: (brand: Brand) => void;
    handleDelete: (brandId: string) => void;
}

const AdminBrandCard: React.FC<AdminBrandCardProps> = ({ brand, handleDelete, handleEdit }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const imageContainerClass = `h-34 w-24 tranistion-all duration-300 bg-white flex flex-row justify-between items-center rounded-l-lg tranistion-all duration-300 `;

    return (
        <div className='flex flex-row w-full bg-dark-surface rounded-lg border border-dark-surface pl-1 h-auto'
            style={{ boxShadow: '-10px 3px 5px -1px rgba(0,0,0,0.2),-6px 5px 8px 0px rgba(0,0,0,0.14), -2px 1px 14px 0px rgba(0,0,0,0.12)' }}
        >

            <div className={imageContainerClass}>
                <BrandImage height={50} width={50} src={brand.imgSource[0].url} alt={brand.name} />
            </div>

            <div className='w-full '>
                <div
                    className='flex flex-row w-full  bg-dark-surface items-center'>

                    <div className='flex p-4 items-center justify-between w-full '>
                        <div className='flex w-36 justify-between items-center'>
                            <div>
                                <Typography variant="h5" color="textPrimary" className='text-lg font-semibold text-on-dark-background'>{brand.name}</Typography>
                            </div>
                            <div>
                                <Chip
                                    label={brand.isActive ? 'Active' : 'Inactive'}
                                    sx={{ backgroundColor: brand.isActive ? '#7BFF00' : 'red', color: 'black', }}
                                    className='animate-pulse'
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center my-2">
                                <Rating color='secondary' value={brand.rating} readOnly />
                            </div>


                        </div>
                        <div className='flex itmes-center justify-between gap-2'>
                            <div className='flex flex-wrap mt- mr-4 items-center'>
                                {brand.tags.map((tag) => (
                                    <Chip key={tag} label={tag} size="small" className="m-1" />
                                ))}
                            </div>
                            <div className=' flex flex-col items-center gap-2'>



                                <Button variant='contained' color='secondary' fullWidth onClick={() => handleEdit(brand)}>Edit</Button>
                                <Button variant='contained' color='error' fullWidth onClick={() => brand?._id && handleDelete(brand?._id)}>Delete</Button>

                            </div>
                            <div className=''>
                                <button
                                    type='button'
                                    aria-label='button'
                                    className={` text-on-secondary text-lg w-full flex justify-between items-center`}
                                    onClick={toggleExpanded}
                                >
                                    <IconButton color='primary'>
                                    <Icon
                                        name="ArrowDown"
                                        height={50}
                                        width={50}
                                        className={`transform transition-transform-ease duration-200 ${expanded ? 'rotate-180 fill-white animate-pulse' : 'fill-white'}`}
                                    />
                                    </IconButton>

                                </button>

                            </div>
                        </div>
                    </div>
                </div>
                <div >
                    <Collapse in={expanded} unmountOnExit>
                        <Typography variant="body2" color="textSecondary" className='text-sm text-on-dark-background p-4'>{brand.description}</Typography>
                    </Collapse>

                </div>
            </div>
        </div>
    );
};

export default AdminBrandCard;
