import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
      const auth = localStorage.getItem('user')
      if(auth){
        navigate('/')
      }
    }, [])
    
    
    const handleLogin=(e)=>{
        Axios.post('http://localhost:5000/login',{  //another method of sending data from react to nodejs using axios
          email,
          password
        }).then((result)=>{
         if(result.data.user){
          navigate('/')
          localStorage.setItem('user',JSON.stringify(result.data.user))
          localStorage.setItem('token',JSON.stringify(result.data.auth))

         }else{
          alert("Incorrect email or password")
         }
        })
    }

    return (
    <div className='login' >
    <h1>Login</h1>

    <input className='inputBox' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' /><br />
    <input className='inputBox' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' /><br />
    <button className='login-button' onClick={handleLogin} >Login</button>
</div>
  )
}

export default Login