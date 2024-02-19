import Link from 'next/link';
import Icon from '@/components/Icon';


interface UserControlsProps {
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
const UserControls: React.FC<UserControlsProps> = ({ setDrawerOpen }) => {
    return (
        <div className="flex items-center justify-end gap-4">
            <Link href="/account">
                <Icon name='Account' width={'40'} height={'40'} className='accountIcon mr-4 hover:text-primary-variant hover:scale-110 transition duration-300' />
            </Link>
            <button aria-label='button' onClick={() => setDrawerOpen(true)}>
                <Icon name='Cart' width={'40'} height={'40'} className='cartIcon hover:text-primary-variant hover:scale-110 transition duration-300' />
            </button>
        </div>
    );
};

export default UserControls;