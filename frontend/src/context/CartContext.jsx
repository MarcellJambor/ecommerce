import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [status, setStatus] = useState(false);
    const [count, setCount] = useState(0);

    
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                setCart(JSON.parse(storedCart));
            } catch (error) {
                console.error("Error parsing cart from localStorage", error);
            }
        }
    }, []);

    
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        setCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    }, [cart]);

    // Add item to cart
    const addToCart = (item, e) => {
        e.stopPropagation();
        setCart((prevCart) => {
            const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevCart.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
        setStatus(true);
    };

    
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    
    const clearCart = () => {
        setCart([]);
    };

   
    const clearStatus = () => {
        setStatus(false);
    };

    return (
        <CartContext.Provider value={{ cart, count, status, addToCart, removeFromCart, clearCart, clearStatus }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
