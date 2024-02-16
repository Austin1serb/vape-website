
import Cart from '@/src/app/components/Cart';
import Footer from '@/src/app/components/Footer';
import LoginReg from '@/src/app/components/LoginReg';
import { CartProvider } from '@/src/app/contexts/useCart';
import React, { useState } from 'react'

const index = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true);


  return (
    <CartProvider>
    {/*<Cart drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>*/}
    <LoginReg/>
    </CartProvider>
  )
}

export default index