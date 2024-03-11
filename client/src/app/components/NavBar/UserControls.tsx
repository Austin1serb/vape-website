import Link from 'next/link';
import Icon from '@/components/Icon';
import AccountIconLocal from '@/Icons/Account.icon';
import CartIcon from '@/Icons/Cart.icon';


interface UserControlsProps {
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
const UserControls: React.FC<UserControlsProps> = ({ setDrawerOpen }) => {
    return (
        <div className="flex items-center justify-end gap-4">
            <Link href="/account">
                <AccountIconLocal name='Account' width={'40'} height={'40'} className='accountIcon mr-4 hover:text-primary-variant hover:scale-110 transition duration-300' />
            </Link>
            <button aria-label='button' onClick={() => setDrawerOpen(true)}>
                <CartIcon name='Cart' width={'40'} height={'40'} className='cartIcon hover:text-primary-variant hover:scale-110 transition duration-300' />
            </button>
        </div>
    );
};

export default UserControls;