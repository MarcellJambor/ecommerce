import React from "react";
import '../App.css';
import NavBar from '../components/NavBar';
import { useState } from "react";
import Items from '../components/Items';
import { useCart } from "../context/CartContext";
import Check from "../components/Check";

const Main = ()=> {
    const [category, setCategory] = useState('');
    const { status } = useCart();

    return(
        <div className="main">
            <NavBar setCategory={setCategory}/>
            <Items category={category}/>
            {status && (
                <div>
                    <Check />
                </div>
            )}
        </div>
    )
};

export default Main;