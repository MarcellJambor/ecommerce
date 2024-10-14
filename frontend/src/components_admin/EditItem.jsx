import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditItem = ()=> {
    const navigate = useNavigate();
    const {id} = useParams();
    const [name,setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    
    const [updatename,setUpdateName] = useState('');
    const [updatedescription, setUpdateDescription] = useState('');
    const [updateprice, setUpdatePrice] = useState('');
    const [updatecategory, setUpdateCategory] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    
    const [message, setMessage] = useState('');

    useEffect(() =>{
        const FetchItems = async () => {
            axios.get(`http://localhost:5001/edit/${id}`)
            .then((response) => {
                setName(response.data.name);
                setDescription(response.data.description);
                setPrice(response.data.price);
                setCategory(response.data.category);
            })
        };

        FetchItems();
    })

    const handleFileChange = (event)=>{
        setSelectedFile(event.target.files[0]);
    };

    const handleSaveChanges = () => {
        const formdata = new FormData();
        formdata.append('image', selectedFile);
        formdata.append('name', updatename);
        formdata.append('description', updatedescription);
        formdata.append('price', updateprice);
        formdata.append('category', updatecategory);

        axios.put(`http://localhost:5001/edit/${id}`,formdata)
        .then(response => setMessage('Edited Successfully'))
        .catch(error => setMessage('Edit Failed'))
    };

    return(
        <div className="dashboard">
            <h1>Ecommerce Dashboard</h1>
            <div className="form">
            <h2>Edit Product</h2>
      <input 
        type="text" 
        placeholder={name} 
        value={updatename} 
        onChange={(e) => setUpdateName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder={description} 
        value={updatedescription} 
        onChange={(e) => setUpdateDescription(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder={price} 
        value={updateprice} 
        onChange={(e) => setUpdatePrice(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder={category} 
        value={updatecategory} 
        onChange={(e) => setUpdateCategory(e.target.value)} 
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSaveChanges}>Save Changes</button>
      <p>{message}</p>
      <button onClick={() => navigate('/admin')}>Back</button>
        </div>
        </div>      
    )
};

export default EditItem;