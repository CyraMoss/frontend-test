import React, { createContext, useState, type PropsWithChildren } from 'react';

export interface CartItem  {
  image: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
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
      const existingItem = prevItems.find((prevItem) => prevItem.name === item.name);
      if (existingItem) {
        return prevItems.map((prevItem) =>
          prevItem.name === item.name ? { ...prevItem, quantity: prevItem.quantity + 1 } : prevItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
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
