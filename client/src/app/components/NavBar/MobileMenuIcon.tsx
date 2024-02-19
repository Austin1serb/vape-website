type MobileMenuIconProps = {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
};

const MobileMenuIcon: React.FC<MobileMenuIconProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => {
    return (
        <button
            aria-label="menu-icon"
            type="button"
            onClick={toggleMobileMenu}
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
    );
};

export default MobileMenuIcon;