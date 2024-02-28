import React from 'react';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
// Import your icons and other components

interface MenuItem {
    icon: JSX.Element;
    text: string;
    component: string;
}

interface GenerateSidebarItemsProps {
    sideBarOpen: boolean;
    handleSidebarItemClick: (component: string) => void;
}

const GenerateSidebarItems: React.FC<GenerateSidebarItemsProps> = ({ sideBarOpen, handleSidebarItemClick }) => {
    const menuItems: MenuItem[] = [
        {

            icon: <svg height='24' version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" >
                <polygon fill="#E8EAF6" points="42,39 6,39 6,23 24,6 42,23" />
                <g fill="#C5CAE9">
                    <polygon points="39,21 34,16 34,9 39,9" />
                    <rect x="6" y="39" width="36" height="5" />
                </g>
                <polygon fill="#B71C1C" points="24,4.3 4,22.9 6,25.1 24,8.4 42,25.1 44,22.9" />
                <rect x="18" y="28" fill="#D84315" width="12" height="16" />
                <rect x="21" y="17" fill="#01579B" width="6" height="6" />
                <path fill="#FF8A65" d="M27.5,35.5c-0.3,0-0.5,0.2-0.5,0.5v2c0,0.3,0.2,0.5,0.5,0.5S28,38.3,28,38v-2C28,35.7,27.8,35.5,27.5,35.5z" />
            </svg>, text: 'Home', component: 'AdminDashboard'
        },
        {
            icon: <svg height='24' width='24' version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enableBackground="new 0 0 48 48">
                <g fill="#3F51B5">
                    <polygon points="17.8,18.1 10.4,25.4 6.2,21.3 4,23.5 10.4,29.9 20,20.3" />
                    <polygon points="17.8,5.1 10.4,12.4 6.2,8.3 4,10.5 10.4,16.9 20,7.3" />
                    <polygon points="17.8,31.1 10.4,38.4 6.2,34.3 4,36.5 10.4,42.9 20,33.3" />
                </g>
                <g fill="#90CAF9">
                    <rect x="24" y="22" width="20" height="4" />
                    <rect x="24" y="9" width="20" height="4" />
                    <rect x="24" y="35" width="20" height="4" />
                </g>
            </svg>, text: 'Products List', component: 'productList'
        },
        {
            icon:
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path fill="#FF7043" d="M38,44H12V4h26c2.2,0,4,1.8,4,4v32C42,42.2,40.2,44,38,44z"></path><path fill="#BF360C" d="M10,4h2v40h-2c-2.2,0-4-1.8-4-4V8C6,5.8,7.8,4,10,4z"></path><g fill="#AB300B"><circle cx="26" cy="20" r="4"></circle><path d="M33,30c0,0-1.9-4-7-4c-5.1,0-7,4-7,4v2h14V30z"></path></g></svg>

            , text: 'Users List', component: 'userList'
        },
        {
            icon: <svg height='24' version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enableBackground="new 0 0 48 48">
                <g fill="#00BCD4">
                    <rect x="37" y="18" width="6" height="24" />
                    <rect x="29" y="26" width="6" height="16" />
                    <rect x="21" y="22" width="6" height="20" />
                    <rect x="13" y="32" width="6" height="10" />
                    <rect x="5" y="28" width="6" height="14" />
                </g>
                <g fill="#3F51B5">
                    <circle cx="8" cy="16" r="3" />
                    <circle cx="16" cy="18" r="3" />
                    <circle cx="24" cy="11" r="3" />
                    <circle cx="32" cy="13" r="3" />
                    <circle cx="40" cy="9" r="3" />
                    <polygon points="39.1,7.2 31.8,10.9 23.5,8.8 15.5,15.8 8.5,14.1 7.5,17.9 16.5,20.2 24.5,13.2 32.2,15.1 40.9,10.8" />
                </g>
            </svg>, text: 'Orders List', component: 'orderList'
        },
        {
            icon:
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" version="1" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill="#7CB342" d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z"></path><path fill="#0277BD" d="M45,24c0,11.7-9.5,21-21,21S3,35.7,3,24S12.3,3,24,3S45,12.3,45,24z M23.8,33.7c0-0.4-0.2-0.6-0.6-0.8 c-1.3-0.4-2.5-0.4-3.6-1.5c-0.2-0.4-0.2-0.8-0.4-1.3c-0.4-0.4-1.5-0.6-2.1-0.8c-0.8,0-1.7,0-2.7,0c-0.4,0-1.1,0-1.5,0 c-0.6-0.2-1.1-1.1-1.5-1.7c0-0.2,0-0.6-0.4-0.6c-0.4-0.2-0.8,0.2-1.3,0c-0.2-0.2-0.2-0.4-0.2-0.6c0-0.6,0.4-1.3,0.8-1.7 c0.6-0.4,1.3,0.2,1.9,0.2c0.2,0,0.2,0,0.4,0.2c0.6,0.2,0.8,1,0.8,1.7c0,0.2,0,0.4,0,0.4c0,0.2,0.2,0.2,0.4,0.2 c0.2-1.1,0.2-2.1,0.4-3.2c0-1.3,1.3-2.5,2.3-2.9c0.4-0.2,0.6,0.2,1.1,0c1.3-0.4,4.4-1.7,3.8-3.4c-0.4-1.5-1.7-2.9-3.4-2.7 c-0.4,0.2-0.6,0.4-1,0.6c-0.6,0.4-1.9,1.7-2.5,1.7c-1.1-0.2-1.1-1.7-0.8-2.3c0.2-0.8,2.1-3.6,3.4-3.1c0.2,0.2,0.6,0.6,0.8,0.8 c0.4,0.2,1.1,0.2,1.7,0.2c0.2,0,0.4,0,0.6-0.2c0.2-0.2,0.2-0.2,0.2-0.4c0-0.6-0.6-1.3-1-1.7c-0.4-0.4-1.1-0.8-1.7-1.1 c-2.1-0.6-5.5,0.2-7.1,1.7s-2.9,4-3.8,6.1c-0.4,1.3-0.8,2.9-1,4.4c-0.2,1-0.4,1.9,0.2,2.9c0.6,1.3,1.9,2.5,3.2,3.4 c0.8,0.6,2.5,0.6,3.4,1.7c0.6,0.8,0.4,1.9,0.4,2.9c0,1.3,0.8,2.3,1.3,3.4c0.2,0.6,0.4,1.5,0.6,2.1c0,0.2,0.2,1.5,0.2,1.7 c1.3,0.6,2.3,1.3,3.8,1.7c0.2,0,1-1.3,1-1.5c0.6-0.6,1.1-1.5,1.7-1.9c0.4-0.2,0.8-0.4,1.3-0.8c0.4-0.4,0.6-1.3,0.8-1.9 C23.8,35.1,24,34.3,23.8,33.7z M24.2,14.3c0.2,0,0.4-0.2,0.8-0.4c0.6-0.4,1.3-1.1,1.9-1.5c0.6-0.4,1.3-1.1,1.7-1.5 c0.6-0.4,1.1-1.3,1.3-1.9c0.2-0.4,0.8-1.3,0.6-1.9c-0.2-0.4-1.3-0.6-1.7-0.8c-1.7-0.4-3.1-0.6-4.8-0.6c-0.6,0-1.5,0.2-1.7,0.8 c-0.2,1.1,0.6,0.8,1.5,1.1c0,0,0.2,1.7,0.2,1.9c0.2,1-0.4,1.7-0.4,2.7c0,0.6,0,1.7,0.4,2.1L24.2,14.3z M41.8,29 c0.2-0.4,0.2-1.1,0.4-1.5c0.2-1,0.2-2.1,0.2-3.1c0-2.1-0.2-4.2-0.8-6.1c-0.4-0.6-0.6-1.3-0.8-1.9c-0.4-1.1-1-2.1-1.9-2.9 c-0.8-1.1-1.9-4-3.8-3.1c-0.6,0.2-1,1-1.5,1.5c-0.4,0.6-0.8,1.3-1.3,1.9c-0.2,0.2-0.4,0.6-0.2,0.8c0,0.2,0.2,0.2,0.4,0.2 c0.4,0.2,0.6,0.2,1,0.4c0.2,0,0.4,0.2,0.2,0.4c0,0,0,0.2-0.2,0.2c-1,1.1-2.1,1.9-3.1,2.9c-0.2,0.2-0.4,0.6-0.4,0.8 c0,0.2,0.2,0.2,0.2,0.4c0,0.2-0.2,0.2-0.4,0.4c-0.4,0.2-0.8,0.4-1.1,0.6c-0.2,0.4,0,1.1-0.2,1.5c-0.2,1.1-0.8,1.9-1.3,2.9 c-0.4,0.6-0.6,1.3-1,1.9c0,0.8-0.2,1.5,0.2,2.1c1,1.5,2.9,0.6,4.4,1.3c0.4,0.2,0.8,0.2,1.1,0.6c0.6,0.6,0.6,1.7,0.8,2.3 c0.2,0.8,0.4,1.7,0.8,2.5c0.2,1,0.6,2.1,0.8,2.9c1.9-1.5,3.6-3.1,4.8-5.2C40.6,32.4,41.2,30.7,41.8,29z"></path></svg>
            , text: 'Brands List', component: 'brandList'
        },
    ];

    return menuItems.map((item, index) => (
        <div
            key={index}
            className={`bg-dark-surface text-on-dark-background my-4  ${!sideBarOpen ? 'justify-start' : ''}`}
            onClick={() => handleSidebarItemClick(item.component)}
        >

            {sideBarOpen ? (
                <div className='mx-2'>
                    <Button fullWidth variant='outlined' color='secondary' className="bg-dark-surface text-on-dark-background  py-4 mx-auto">
                        <div className="bg-dark-surface text-on-dark-background w-full py-4 flex flex-nowrap justify-between mx-2">
                            <div className='w-6 h-6'>{item.icon}</div>
                            <ListItemText primary={item.text} />
                        </div>
                    </Button>
                </div>
            ) : (
                <div className='mt-8'>
                    <IconButton className='group hover:grayscale grayscale-0'>
                        <div className='flex items-center flex-col h-12 w-12  transition-all duration-200'>
                            <div className='w-6 h-6'>
                                {item.icon}
                            </div>

                            <div className='text-sm group-hover:text-white group-hover:underline transition-all duration-200 '>
                                {item.text.split(' ')[0]}
                            </div>
                        </div>
                    </IconButton>
                </div>
            )}
        </div>
    ));
};
export default GenerateSidebarItems;
