// Sidebar.tsx
import React from 'react';
import { Drawer, IconButton, Divider } from '@mui/material';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import ArrowDown from '@/Icons/ArrowDown.icon';
import GenerateSidebarItems from './GenerateSideBarItems';

interface SidebarProps {
  open: boolean;
  handleToggle: () => void;
  handleItemClick: (component: string) => void;
  loading: boolean;
}

const drawerWidth = 275;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  border: 'none',
  boxShadow: '20px 0 20px -10px rgba(0, 0, 0, 0.5)',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  border: 'none',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 14px)`,
  },
});

const CustomDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar: React.FC<SidebarProps> = ({ open, handleToggle, handleItemClick, loading }) => {
  return (
    <CustomDrawer variant="permanent" anchor="left" open={open}>
      <DrawerHeader sx={{ backgroundColor: 'var(--color-primary-variant)' }} className="h-[70px]">
        <IconButton onClick={handleToggle}>
          <ArrowDown name="ArrowDown" height={30} width={30} className={`transform transition-all duration-200 hover:text-secondary  ${open ? 'rotate-90' : '-rotate-90'}`} />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <div className="bg-dark-surface text-on-dark-background h-full shadow-lg w-full pl-2">
        <GenerateSidebarItems sideBarOpen={open} handleSidebarItemClick={handleItemClick} disabled={loading} />
      </div>
    </CustomDrawer>
  );
};

export default Sidebar;
