import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

function Nav() {
  const auth = localStorage.getItem('user')
  const navigate = useNavigate()  //its also have another use ,, when this is used the page will redirect or refresh so signup and logout change
  const logout =()=>{
    localStorage.clear()
    navigate('/signup')
  }
  
  return (
    <div>
      <img className='logo' src='https://cdn.dribbble.com/users/3240040/screenshots/10780380/media/14bfc74470bc1cda6ef6e6e4f040ed25.jpg?resize=400x0' ></img>
      
      {
        auth ?  <ul className='nav-ul' >
        <li><Link to='/products'>Products</Link></li>
        <li><Link to='/addproducts'>Add products</Link></li>
        <li><Link to='/updateproducts'>Update products</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name}) </Link></li>  {/*JOSN.parse used to convert the local storage name which is in string to json format */}
        </ul>
        :
        <ul className='nav-ul nav-right' >
        <li><Link to='/signup' >SignUp</Link></li>  
            <li><Link to='/login'>Login</Link></li>    
        </ul>
      }        
               
    </div>
  )
}

export default Nav