import { useState } from "react";
import Cards from "./Cards";
import { useEffect } from "react";
import axios from 'axios';
import '../App.css';
import {SpinningCircles} from 'react-loading-icons';

const Items = (props) => {
    const category = props.category;
    const [products,setProducts] = useState();
    const [loading, setLoading] = useState();

    useEffect(() => {

        const UseFetch = async () => {
            setLoading(true)

            try {
                const response = await axios.get(`http://localhost:5001/items`, {
                  params: { category }
                });
          
                setProducts(response.data);
          
              } catch (err) {
                console.error('Error fetching products:', err);
              }
              setLoading(false)
            };

        UseFetch();
    },[category]);

    return(
        <div className="items">
        {products && products.length > 0  ? (
        products.map(product => (
          <Cards
            key={product._id}
            id={product._id}
            name={product.name}
            description={product.description}
            price={product.price}
            category={product.category}
            imageUrl={`http://localhost:5001/image/${product._id}`}
          />
        ))
      ) : (
        loading ? (
          <div>
            <SpinningCircles />
          </div>
        ) : (
          <div>
          </div>
        )
      )}
      
        </div>
    )
};

export default Items;