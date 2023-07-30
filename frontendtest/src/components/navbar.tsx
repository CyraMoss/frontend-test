import React, { useState, useContext } from 'react';
import { CartContext } from '~/utils/cartContext';
import Image from 'next/image';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useContext(CartContext);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div className='relative'>
      <div className='bg-headerBackground text-fontSecondary flex justify-end' onClick={toggleCart}>
        My Cart ({cartItems.length})
      </div>
      {isCartOpen && (
        <div className='cart-dropdown w-full md:w-1/2 m-4 text-xs md:text-lg bg-white absolute top-5 right-0 border border-borderLightGrey shadow-md p-4 min-w-200 z-10'>
          {/* Render the cart items */}
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.name} className='flex gap-4'>
                <div className='mb-6'>
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    width={100}
                    height={50} 
                  />
                </div>
                <div >
                  <p className='text-lg pb-2'>{item.name}</p>
                  <p className='font-bold pb-2'><span>{item.quantity} x</span> ${item.price}</p>
                  {item.size.map((sizeOption: { id: number; label: string }) => (
                    <p  key={sizeOption.id}>Size: {sizeOption.label}</p>
                  ))}
                </div>
                <hr/>
              </div>
            ))
          ) : (
            <p className='bg-white'>No items in the cart</p>
          )}
        </div>
      )}
    </div>
  );
}
