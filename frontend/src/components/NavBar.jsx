import { Link } from "react-router-dom";
import Logo from '../assets/logo.webp';
import '../App.css';
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const NavBar = ({ setCategory }) => {
    const navigate = useNavigate();
    const { count } = useCart();  

    const handleCategoryClick = (category) => {
        if (typeof setCategory === 'function') {
            setCategory(category);
        }
    };

    return (
        <div className="navbar">
            <h1 onClick={() => navigate('/')}>Pear</h1>
            <img src={Logo} alt="Logo" />
            <ul>
                <li><Link to="/" onClick={() => handleCategoryClick('')}>All</Link></li>
                <li><Link to="/" onClick={() => handleCategoryClick('Macbook')}>MacBook</Link></li>
                <li><Link to="/" onClick={() => handleCategoryClick('Imac')}>Imac</Link></li>
                <li><Link to="/" onClick={() => handleCategoryClick('MacMini')}>Mac Mini</Link></li>
                <li><Link to="/" onClick={() => handleCategoryClick('Ipad')}>Ipad</Link></li>
                <li><Link to="/" onClick={() => handleCategoryClick('Iphone')}>Iphone</Link></li>
                <li><Link to="/" onClick={() => handleCategoryClick('Watch')}>Watch</Link></li>
                <li><Link to="/" onClick={() => handleCategoryClick('Display')}>Display</Link></li>
            </ul>
            <div className="navbar-cart">
                <Link to="/cart">Cart</Link>
                <div className='cart-count'>
                    {count}
                </div>
            </div>
        </div>
    );
};

export default NavBar;
