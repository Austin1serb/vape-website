"use client"
// components/NavBar.tsx
import Link from 'next/link';
import { useState } from 'react';
import Icon from '@/src/app/components/Icon';

type NavLink = {
    href: string;
    label: string;
};

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

const NavBar = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(true);

    return (
        <nav className="bg-white ">
            {/* Desktop Menu */}
            <div className="hidden md:flex justify-between items-center h-28 ">
                <div className="flex-1" />
                <div className="flex items-center justify-center flex-1">
                    <Link href='/'>
                    <Icon name='Herba' className='herbaIcon h-9/12 w-9/12 fill-primary' />

                    </Link>
                    
                </div>
                <div className="flex items-center justify-end flex-1 gap-4">
                    <Link href="/account">
                        <Icon name='Account' width={'40'} height={'40'} className='accountIcon mr-4 hover:text-primary-variant hover:scale-110 transition duration-300' />
                    </Link>
                    <Link href="/cart">
                        <Icon name='Cart' width={'40'} height={'40'} className='cartIcon mr-4 hover:text-primary-variant hover:scale-110 transition duration-300' />
                    </Link>
                </div>
            </div>
            <div className="hidden md:block border-b-2" />
            <ul className="hidden sm:flex justify-evenly py-2 sm:text-xs md:sm lg:text-base xl:text-lg">
                {navLinks.map((link, i) => (
                    <li key={i} className="relative group">
                        <Link href={link.href}>
                            <span className="uppercase font-semibold text-black group-hover:text-secondary transition duration-300">
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            </span>
                        </Link>
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
                    {/* Top Bar */}
                    <span className={`block w-10 h-1 bg-black ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5 bg-primary' : ''} transform all duration-300 ease-in-out`}></span>
                    {/* Middle Bar */}
                    <span className={`block w-10 h-1 bg-black ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'} transition-all duration-300 ease-in-out`}></span>
                    {/* Bottom Bar */}
                    <span className={`block w-10 h-1 bg-black ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5 bg-primary' : ''} transform all duration-300 ease-in-out`}></span>
                    {/* Middle Bar */}
                    <span className={`block w-10 h-1 bg-black ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'} transition-all duration-300 ease-in-out`}></span>
                </button>
                <Icon name='Herba' width={'375'} height={'175'} className='herbaIcon h-full w-full fill-primary' />
                <div className="flex items-center justify-end flex-1 gap-4">
                    <Link href="/account">
                        <Icon name='Account' width={'40'} height={'40'} className='accountIcon hover:text-primary-variant hover:scale-110 transition duration-300' />
                    </Link>
                    <Link href="/cart">
                        <Icon name='Cart' width={'40'} height={'40'} className='cartIcon hover:text-primary-variant hover:scale-110 transition duration-300' />
                    </Link>
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

        </nav>
    );
};

export default NavBar;
