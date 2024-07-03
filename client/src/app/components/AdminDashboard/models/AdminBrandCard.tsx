import React, { useState } from 'react';
import { Typography, Chip, Button, Collapse, IconButton, darken } from '@mui/material';
import BrandImage from '@/components/BrandImage';
import { Brand } from '@/components/types';
import FullStar from '@/Icons/FullStar.icon';
import HalfStar from '@/Icons/HalfStar.icon';
import EmptyStar from '@/Icons/EmptyStar.icon';
import ArrowDown from '@/Icons/ArrowDown.icon';


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


    const renderStars = (score: number) => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= score) {
                // Full star
                stars.push(<FullStar name={'FullStar'} height={15} width={15} key={i} className="rating-stars" />);
            } else if (i - 1 < score && i > score) {
                // Half star - adjust this logic if you have a way to represent half stars
                stars.push(<HalfStar name={'HalfStar'} height={15} width={15} key={i} className="rating-stars" />);
            } else {
                // Empty star
                stars.push(<EmptyStar name={'EmptyStar'} height={15} width={15} key={i} className="rating-stars" />);
            }
        }
        return stars;
    };


    return (
        <div className='flex flex-row w-full bg-dark-surface rounded-lg border border-dark-surface pl-1 h-auto'
            style={{ boxShadow: '-10px 3px 5px -1px rgba(0,0,0,0.2),-6px 5px 8px 0px rgba(0,0,0,0.14), -2px 1px 14px 0px rgba(0,0,0,0.12)', }}
        >

            <div className={imageContainerClass}>
                <BrandImage height={50} width={100} src={brand.imgSource[0].url} alt={brand.name} style={{objectFit:'cover', padding:'5px'}} />
            </div>

            <div className='w-full '>
                <div
                    className='flex flex-row w-full  bg-dark-surface items-center'>

                    <div className='flex p-2 items-center justify-between w-full '>
                        <div>
                            <div className='flex w-52 justify-between items-center '>
                                <div>
                                    <Typography variant="h5" color="textPrimary" className='text-lg font-semibold text-on-dark-background whitespace-nowrap' mx={1}>{brand.name}</Typography>
                                </div>
                                <div >
                                    <Chip
                                        label={brand.isActive ? 'Active' : 'Inactive'}
                                        sx={{ backgroundColor: brand.isActive ? 'var(--color-secondary)' : 'red', color: 'black', }}
                                        className='animate-pulse'
                                    />
                                </div>
                            </div>


                            <div className="flex items-center m-2">
                                {renderStars(brand.rating as number)}
                            </div>


                        </div>
                        <div className='flex itmes-center justify-between'>
                        <div className="flex flex-wrap items-center mx-4 gap-2">
    {brand.tags.map((tag, index) => {
        // Dynamically assign color or style based on the tag, if applicable.
        const chipColor = `bg-gradient-to-r from-100-500 to-300-500`; // Example dynamic background.
        // Note: Tailwind does not support dynamic class names out of the box. You might need to use inline styles or predefined classes.

        return (
            <Chip
                key={tag}
                label={tag}
                // Using `sx` for dynamic styles; for Tailwind, you'd apply classes directly or use inline styles as needed.
                sx={{
                    //backgroundColor: chipColor, // For MUI, replace this with your logic to determine the color or gradient.
                    //'&:hover': {
                    //    backgroundColor: darken(chipColor, 0.2), // Example to darken on hover.
                    //},
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                }}
                size="small"
                className={`m-1 text-white ${chipColor}`} // Example of applying Tailwind classes along with dynamic color.
                // Optional: add a tooltip or click handler.
                // onClick={() => handleTagClick(tag)}
                // title="More info" // Tooltip text; consider using MUI's Tooltip component for more interactive tooltips.
            />
        );
    })}
</div>

                            <div className='flex flex-row'>
                                <div className=' flex flex-col items-center gap-2'>
                                    <Button size='small' variant='contained' color='primary' fullWidth onClick={() => handleEdit(brand)}>Edit</Button>
                                    <Button size='small' variant='contained' color='secondary' fullWidth onClick={() => brand?._id && handleDelete(brand?._id)}>Delete</Button>
                                </div>
                                <div
                                    aria-label='button'
                                    className='text-on-secondary text-lg w-full flex justify-between items-center'
                                >
                                    <IconButton color='primary' onClick={toggleExpanded}>
                                        <ArrowDown

                                            name="ArrowDown"
                                            height={50}
                                            width={50}
                                            className={`transform transition-transform-ease duration-200 ${expanded ? 'rotate-180 fill-white animate-pulse' : 'fill-white'}`}
                                        />
                                    </IconButton>
                                </div>

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
