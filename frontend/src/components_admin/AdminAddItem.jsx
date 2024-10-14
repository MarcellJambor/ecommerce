import { useState } from "react";
import axios from 'axios';
import styles from './Dashboard.module.css';

const AdminAddItem = ()=>{
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const handleFileChange = (event)=>{
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async ()=>{
        const formData = new FormData();
        formData.append("image", selectedFile);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);

        await axios.post('http://localhost:5001/upload', formData)
      .then(response => {
        setMessage('Product uploaded successfully');
      })
      .catch(error => {
        setMessage('Error uploading product');
      });

      setSelectedFile(null);
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');

    };

    return(
        <div className={styles.form}>
            <h2>Upload Product</h2>
      <input 
        type="text" 
        placeholder="Product Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Price" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Category" 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Product</button>
      <p>{message}</p>
        </div>
    )
};

export default AdminAddItem;