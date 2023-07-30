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
      <div className='bg-gray-200 flex justify-end' onClick={toggleCart}>
        mini cart ({cartItems.length})
      </div>
      {isCartOpen && (
        <div className='cart-dropdown m-3 w-1/2 bg-white absolute top-5 right-0 border border-gray-300 shadow-md p-4 min-w-200 z-10'>
          {/* Render the cart items */}
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.name} className='flex gap-4'>
                <div>
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    width={100}
                    height={50} 
                  />
                </div>
                <div>
                  <p className='text-lg'>{item.name}</p>
                  <p className='font-bold'>${item.price}</p>
                  {item.size.map((sizeOption: { id: number; label: string }) => (
                    <p  key={sizeOption.id}>Size: {sizeOption.label}</p>
                  ))}
                  <p>Quantity: {item.quantity}</p>
                </div>
                <hr/>
              </div>
            ))
          ) : (
            <p>No items in the cart</p>
          )}
        </div>
      )}
    </div>
  );
}
