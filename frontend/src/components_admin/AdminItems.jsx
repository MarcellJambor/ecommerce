import { useEffect, useState } from "react";
import ItemCards from "./ItemCards";
import axios from "axios";

const AdminItems = ()=> {
    const [items, SetItems] = useState([]);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5001/get');
            SetItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };
    
    useEffect(() => {   
        fetchItems();
    }, []);

    return(
        <div>
            {items.map((product) => (
                <ItemCards
                    key={product._id}  
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    id={product._id}
                    onDelete={fetchItems}
                />
            ))}
        </div>
    )
};

export default AdminItems;