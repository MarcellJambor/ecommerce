import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useCart } from "../context/CartContext";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [price, setPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const totalPrice = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    setPrice(totalPrice);
  }, [cart]);

    return(
        <div className='header'>
            <NavBar/>
            <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className='cart'>
          <ul className='cart-items'>
            {cart.map((item) => (
              <li key={item.id} className='cart-item'>
            <img src={item.imageUrl} alt="" /> {item.name} - ${item.price} x {item.quantity}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
            <div className='actions'>
              <div className='prices'>
                <h2>{price} $</h2>
              </div>
            <div className='buttons'>
              <button onClick={clearCart}>Clear Cart</button>
              <button onClick={() => navigate('/checkout')}>CheckOut</button>
            </div>
        </div>
          </div>
        )}
        </div>
    )
};

export default Cart;