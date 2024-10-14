import React, { useState } from "react";
import styles from '../components_admin/Dashboard.module.css';
import AdminAddItem from "../components_admin/AdminAddItem";
import AdminItems from "../components_admin/AdminItems";

const Dashboard =()=>{
    const [content, SetContent] = useState('');

    return(
        <div className={styles.dashboard}>
            <h1>Ecommerce Dashboard</h1>
            <div className={styles.navbar}>   
                <ul className={styles.list}>
                    <li><button onClick={() => SetContent('additem')}> AddItem </button></li>
                    <li><button onClick={() => SetContent('items')}> Items </button></li>
                </ul>
            </div>
            <div className={styles.content}>
                {content === 'additem' ? <AdminAddItem/> : null}
                {content === 'items' ? <AdminItems/> : null}
            </div>
        </div>
        
    )
};

export default Dashboard;