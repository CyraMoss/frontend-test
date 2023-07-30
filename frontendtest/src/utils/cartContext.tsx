import React, { createContext, useState, type PropsWithChildren } from 'react';

export interface CartItem  {
  image: string;
  name: string;
  price: number;
  quantity: number;
  size: { id: number; label: string }[];
};

export interface CartContextType  {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {
    console.log("from cart context");
  },
  removeFromCart: () => {
    console.log("from cart context");
  },
});

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (prevItem) => prevItem.name === item.name && prevItem.size[0]?.id === item.size[0]?.id
      );
  
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, increase its quantity
        const updatedItems = [...prevItems];
        if (updatedItems[existingItemIndex]) {
          // Add type assertion to let TypeScript know that the item at existingItemIndex is not undefined
          updatedItems[existingItemIndex]!.quantity += 1;
        }
        return updatedItems;
      } else {
        // If the item doesn't exist in the cart, create a new one and add it to the cart
        const newItem: CartItem = {
          ...item,
          quantity: 1, // Set initial quantity to 1
        };
        return [...prevItems, newItem];
      }
    });
  };
  
  const removeFromCart = (item: CartItem) => {
    setCartItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.name === item.name && prevItem.quantity > 0
          ? { ...prevItem, quantity: prevItem.quantity - 1 }
          : prevItem
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
