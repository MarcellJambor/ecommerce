import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdminAddItem from './components_admin/AdminAddItem';
import EditItem from './components_admin/EditItem';
import AdminItems from './components_admin/AdminItems';
import Main from './pages/Main';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Product from './pages/Product';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/admin' element={<Dashboard/>}/>
        <Route path='/additem' element={<AdminAddItem/>}/>
        <Route path='/edit/:id' element={<EditItem/>}/>
        <Route path='/items' element={<AdminItems/>}/>
        <Route path='/' element={<Main/>}/>
        <Route path='/product/:id' element={<Product/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
      </Routes>
    </div>   
  );
}

export default App;
