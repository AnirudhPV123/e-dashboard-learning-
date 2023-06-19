import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path='/products' element={<Products/>} />
        <Route path='/addproducts' element={<AddProduct/>} />
        <Route path='/update/:id' element={<UpdateProduct/>} />
        <Route path='/logout' element={<h1>Logout</h1>} />
        <Route path='/profile' element={<h1>Profile</h1>} />
        
      </Route>

      <Route path='/signup' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />

      </Routes>
      
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
