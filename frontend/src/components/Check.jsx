import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import './Check.css';

const Check = () => {
    const { cart, clearStatus } = useCart();

    return (
        <div className="modal-backdrop" onClick={clearStatus}>
            <div className="modal-content">
            <h2>Items in your cart:</h2>
            {cart.length > 0 ? (
                cart.map((item, index) => (
                    <div className="modal-product" key={index}>
                        <img src={item.imageUrl} alt="" />
                        <p>{item.name}</p>
                        <p>{item.price}$</p>
                        <p>{item.quantity}</p>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}
            <div className="modal-actions">
                <button onClick={clearStatus}>
                    <Link to="/">Continue shopping</Link>
                </button>
                <button onClick={clearStatus}>
                    <Link to="/cart">Go to Cart</Link>
                </button>
            </div>
            </div>
        </div>
    );
};

export default Check;
