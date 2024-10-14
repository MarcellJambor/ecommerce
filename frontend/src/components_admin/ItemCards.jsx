import axios from 'axios';
import styles from './Dashboard.module.css';
import { useNavigate } from "react-router-dom";

const ItemCards = (props)=> {
    const navigate=useNavigate();

    const handleDelete = () => {
        axios.delete(`http://localhost:5001/delete/${props.id}`)
        .then(() => {
            props.onDelete();
        })
        .catch( (error) => {
            console.error('Error fetching items:', error);
        })
    }

    return(
        <div className={styles.card}>
            <p>{props.name}</p>
            <p>{props.category}</p>
            <p>{props.price}</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => navigate(`/edit/${props.id}`)}>Edit</button>
        </div>
    )
};

export default ItemCards;