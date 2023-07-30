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
    <div className='bg-gray-200 flex flex-end'>
      <div onClick={toggleCart}>mini cart ({cartItems.length})</div>
      {isCartOpen && (
        <div className='cart-dropdown'>
          {/* Render the cart items */}
          {cartItems.map((item) => (
            <div key={item.name} className='flex'>
              <div>
                <Image 
                  src={item.image} 
                  alt={item.name}
                  width={50}
                  height={50} 
                />
              </div>
              <div>
                <p>{item.name}</p>
                <p>{item.price}</p>
                {item.size.map((sizeOption: { id: number; label: string }) => (
  <p key={sizeOption.id}>Size: {sizeOption.label}</p>
))}
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
