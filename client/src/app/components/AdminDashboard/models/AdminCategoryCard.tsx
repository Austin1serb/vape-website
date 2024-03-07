import React, { useState } from 'react';
import { Typography, Button, Collapse, IconButton } from '@mui/material';
import { Category } from '@/components/types';
import Icon from '@/components/Icon';

interface AdminCategoryCardProps {
    category: Category;
    handleEdit: (category: Category) => void;
    handleDelete: (categoryId: string) => void;
}

const AdminCategoryCard: React.FC<AdminCategoryCardProps> = ({ category, handleDelete, handleEdit }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    return (
        <div className='flex flex-row w-full bg-dark-surface rounded-lg border border-dark-surface pl-1 h-16'
            style={{ boxShadow: '-10px 3px 5px -1px rgba(0,0,0,0.2),-6px 5px 8px 0px rgba(0,0,0,0.14), -2px 1px 14px 0px rgba(0,0,0,0.12)' }}
        >
            <div className='flex items-center justify-between w-full min-w-96'>
                <div className='flex w-full justify-between items-center'>
                    <Typography variant="h6" color="var(--color-on-dark-background)" sx={{ml:1}}>{category.name}</Typography>
                    <Collapse in={expanded} unmountOnExit>
                        <Typography variant="body2" color="textSecondary" className='text-sm text-on-dark-background p-4'>{category.description}</Typography>
                    </Collapse>
                    <div className='w-40 flex item-center justify-between'>
                    <Button size='small' variant='contained' color='secondary' onClick={() => handleEdit(category)}>Edit</Button>
                    <Button size='small' variant='contained' color='error' onClick={() => category._id && handleDelete(category._id)}>Delete</Button>
                    </div>
                </div>

                <IconButton color='primary' onClick={toggleExpanded}>
                    <Icon name="ArrowDown" height={30} width={30} className={`transform transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                </IconButton>
            </div>


        </div>
    );
};

export default AdminCategoryCard;
