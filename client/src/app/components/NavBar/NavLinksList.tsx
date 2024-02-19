import Link from 'next/link';

type NavLink = {
    href: string;
    label: string;
};
interface NavLinksListProps {
    navLinks: NavLink[];
    isMobile?: boolean;
  }

const NavLinksList: React.FC<NavLinksListProps> = ({ navLinks, isMobile = false }) => {
    return (
        <ul className={`flex ${isMobile ? 'flex-col' : 'justify-evenly py-2'} sm:text-xs md:sm lg:text-base xl:text-lg`}>
            {navLinks.map((link, i) => (
                <li key={i} className="relative group">
                    <Link href={link.href}>
                        <span className="uppercase font-semibold text-black group-hover:text-secondary transition duration-300">
                            {link.label}
                            {!isMobile && (
                                <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover:w-full transition-all duration-300"></span>
                            )}
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavLinksList;