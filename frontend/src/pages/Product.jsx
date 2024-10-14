import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Product = () => {
    const {id} = useParams();
    const [product,setProduct] = useState(null);
    const {addToCart} = useCart();


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProduct();
    },[id])

    return(
        <div>
            <NavBar/>
            <div className='product'>
            {product ? (
                <>
                    <div className='image'>
                        <img src={`http://localhost:5001/image/${id}`} alt={product.name} />
                    </div>
                    <div className='details'>
                        <h1>{product.name}</h1>
                        <h3>{product.price} $</h3>
                        <p>{product.description}</p>
                        <button onClick={(e) => addToCart(product, e)}>Add to Cart</button>
                    </div>
                </>
            ) : (
                <div>
                    No Product Available
                </div>
            )}
            </div>
        </div>
    )
};

export default Product;