import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cards = (props) => {
    const navigate = useNavigate();
    const {addToCart} = useCart();

    return (
        <div className="card" onClick={() => navigate(`/product/${props.id}`)}>
            <img src={props.imageUrl} alt="" />
            <h3 className="name">{props.name}</h3>
            <p className="price">{props.price}$</p>
            <button onClick={(e) => addToCart(props, e)}>Add to Cart</button>
        </div>
    );
};

export default Cards;
