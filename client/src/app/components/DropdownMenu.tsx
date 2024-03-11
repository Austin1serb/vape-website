
import Link from 'next/link';

interface DropdownMenuItem {
    label: string;
    href: string;
}

interface DropdownMenuSection {
    title: string;
    items: DropdownMenuItem[];
}

interface DropdownMenuProps {
    menuData: DropdownMenuSection[];
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ menuData }) => {
    return (
        <div style={{boxShadow:'0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
    }} className="absolute opacity-0 translate-y-24 group-hover:opacity-100 group-hover:translate-y-0 bg-white shadow-2xl divide-x divide-gray-100 rounded-sm transition-all duration-300 ease-out z-10 flex w-screen max-w-[900px] pointer-events-none group-hover:pointer-events-auto p-4 border-b-2">
            {menuData.map((section, index) => (
                <div key={index} className="w-full py-2 flex flex-col items-start">
                    <p className="text-gray-800 font-semibold px-4 hover:cursor-text">{section.title}</p>
                    {section.items.map((item, itemIndex) => (

                        <div key={itemIndex} className='px-4 py-2' >
                            <Link href={item.href} className="relative group/link">
                                <div className="blocktext-sm text-gray-700 group-hover/link:text-secondary group-hover:opacity-90 transition duration-300 hover:cursor-pointer ">
                                    {item.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-[0.1rem] bg-secondary group-hover/link:w-full transition-all duration-300 "></span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default DropdownMenu;