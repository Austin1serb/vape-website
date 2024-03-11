"use client"

import Link from 'next/link';
import { useState } from 'react';
import Icon from '@/components/Icon';
import Cart from './Cart';
import DropdownMenu from './DropdownMenu';
import { useRouter } from 'next/navigation';
import Herba from '@/Icons/Herba.icon';
import AccountIconLocal from '@/Icons/Account.icon';
import CartIcon from '@/Icons/Cart.icon';

interface NavLink {
    href: string;
    label: string;
}


const brandsMenuData = [
    {
        title: 'Vaporizers',
        items: [
            { label: 'Product 1', href: '/vaporizers/product1' },
            { label: 'Product 2', href: '/vaporizers/product2' },
            { label: 'Product 1', href: '/vaporizers/product1' },
            { label: 'Product 2', href: '/vaporizers/product2' },
            { label: 'Product 1', href: '/vaporizers/product1' },
            { label: 'Product 2', href: '/vaporizers/product2' },
            { label: 'Product 1', href: '/vaporizers/product1' },
            { label: 'Product 2', href: '/vaporizers/product2' },
            // More items...
        ],
    },
    {
        title: 'E-liquids',
        items: [
            { label: 'Product 1', href: '/e-liquids/product1' },
            { label: 'Product 2', href: '/e-liquids/product2' },
            { label: 'Product 1', href: '/e-liquids/product1' },
            { label: 'Product 2', href: '/e-liquids/product2' },
            { label: 'Product 1', href: '/e-liquids/product1' },
            { label: 'Product 2', href: '/e-liquids/product2' },
            { label: 'Product 1', href: '/e-liquids/product1' },
            { label: 'Product 2', href: '/e-liquids/product2' },
            // More items...
        ],
    },
];

const productsMenuData = [
    {
        title: 'Category 1',
        items: [
            { label: 'Item 1', href: '/category1/item1' },
            { label: 'Item 2', href: '/category1/item2' },
            { label: 'Item 1', href: '/category1/item1' },
            { label: 'Item 2', href: '/category1/item2' },
            { label: 'Item 1', href: '/category1/item1' },
            { label: 'Item 2', href: '/category1/item2' },
            { label: 'Item 1', href: '/category1/item1' },
            { label: 'Item 2', href: '/category1/item2' },
            { label: 'Item 1', href: '/category1/item1' },
            { label: 'Item 2', href: '/category1/item2' },
            // More items...
        ],
    },
    {
        title: 'Category 2',
        items: [
            { label: 'Item 1', href: '/category2/item1' },
            { label: 'Item 2', href: '/category2/item2' },
            { label: 'Item 1', href: '/category2/item1' },
            { label: 'Item 2', href: '/category2/item2' },
            { label: 'Item 1', href: '/category2/item1' },
            { label: 'Item 2', href: '/category2/item2' },
            // More items...
        ],
    },
];


const navLinks: NavLink[] = [
    { href: '/new', label: 'NEW' },
    { href: '/brands', label: 'BRANDS' },
    { href: '/accessories', label: 'ACCESSORIES' },
    { href: '/disposibles', label: 'DISPOSIBLES' },
    { href: '/startkits', label: 'STARTER KITS' },
    { href: '/startkits', label: 'STARTER KITS' },
    { href: '/startkits', label: 'STARTER KITS' },
    { href: '/startkits', label: 'STARTER KITS' },

];

const NavBar: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const router = useRouter()

    return (
        <nav className="bg-white mx-auto max-w-7xl">
            {/* Desktop Menu */}
            <div className="hidden md:flex justify-between items-center h-28 ">
                <div className="flex-1" />
                <div className="flex items-center justify-center flex-1">
                    <Link href='/'>
                        <Herba name='Herba' className='herbaIcon h-9/12 w-9/12 fill-primary' />

                    </Link>

                </div>
                <div className="flex items-center justify-end flex-1 gap-4">
                    <Link href="/account">
                        <AccountIconLocal name='Account' width={'40'} height={'40'} className='accountIcon mr-4 hover:text-primary-variant hover:scale-110 transition duration-300' />
                    </Link>
                    <button aria-label='button' onClick={() => setDrawerOpen(true)}>
                        <CartIcon name='Cart' width={'40'} height={'40'} className='cartIcon mr-4 hover:text-primary-variant hover:scale-110 transition duration-300' />
                    </button>
                </div>
            </div>
            <div className="hidden md:block border-b-2" />
            <ul className="hidden sm:flex justify-evenly py-2 sm:text-xs md:sm lg:text-base xl:text-lg ">
                {navLinks.map((link, i) => (
                    <li key={i} className="relative group">
                        <button type='button' onClick={() => router.push(`/shop${link.href}`)} >
                            <div className="uppercase font-semibold text-black group-hover:text-secondary group-hover:opacity-90 transition duration-300">
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </div>
                        </button>
                        {link.label === 'BRANDS' && <DropdownMenu menuData={brandsMenuData} />}
                        {link.label === 'Products' && <DropdownMenu menuData={productsMenuData} />}
                    </li>
                ))}
            </ul>


            {/* Mobile Menu */}
            <div className="md:hidden  flex justify-between items-center py-2 px-4 h-24">

                {/* MENU HAMBURGER ICON */}
                <button
                    aria-label="menu-icon"
                    type="button"
                    onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-12 h-10 flex flex-col justify-center items-center gap-1.5 relative hover:shadow-md transition-shadow duration-300 ease-in-out"

                >

                </button>
                <Herba name='Herba' width={'375'} height={'175'} className='herbaIcon h-full w-full fill-primary' />
                <div className="flex items-center justify-end flex-1 gap-4">
                    <Link href="/account">
                        <AccountIconLocal name='Account' width={'40'} height={'40'} className='accountIcon hover:text-primary-variant hover:scale-110 transition duration-300' />
                    </Link>
                    <button type='button' aria-label='button' onClick={() => setDrawerOpen(true)}>
                        <CartIcon name='Cart' width={'40'} height={'40'} className='cartIcon hover:text-primary-variant hover:scale-110 transition duration-300' />
                    </button>
                </div>
            </div>

            {isMobileMenuOpen && (
                <ul className="md:hidden">
                    {navLinks.map((link) => (
                        <li key={link.href} className="border-t border-gray-200">
                            <Link href={link.href}>
                                <span className="block p-4 text-sm uppercase font-semibold text-primary hover:primary-variant">
                                    {link.label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}

            <Cart drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
        </nav>
    );
};

export default NavBar;
