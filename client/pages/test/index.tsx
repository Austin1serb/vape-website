
import Cart from '@/src/app/components/Cart';
import Footer from '@/src/app/components/Footer';

import SubscribeField from '@/src/app/components/SubscribeField';
import { CartProvider } from '@/src/app/contexts/useCart';
import React, { useState } from 'react'

const index = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);


  return (
    <CartProvider>
    <Cart setDrawerOpen={function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.');
    } }/>
    </CartProvider>
  )
}

export default index