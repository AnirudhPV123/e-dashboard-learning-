import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Axios from 'axios'
function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('user')
    if(auth){
      navigate('/')
    }
  },[])
  

  // const handleSubmit=async(e)=>{
  //   let result = await fetch('http://localhost:5000/signup',{
  //     method:'post',
  //     body: JSON.stringify({name,email,password}),
  //     headers:{
  //       "Content-Type":"application/json"
  //     }
  //   })
  //   result = await result.json()
  //   console.log(result)
  //   localStorage.setItem("user",JSON.stringify(result.data))
  //   localStorage.setItem("token",JSON.stringify(result.auth))

  //   navigate('/')


   
    
  // }

  const handleSubmit=(e)=>{
    Axios.post('http://localhost:5000/signup',{  //another method of sending data from react to nodejs using axios
    name,  
    email,
      password
    }).then((result)=>{
     if(result.data.user){
      navigate('/')
      localStorage.setItem('user',JSON.stringify(result.data.user[0]))
          localStorage.setItem('token',JSON.stringify(result.data.auth))

     }
     
    })
}




  return (
    <div className='signup' >
        <h1>Signup hello</h1>

        <input className='inputBox' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' /><br />
        <input className='inputBox' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' /><br />
        <input className='inputBox' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' /><br />
        <button className='signUp-button' onClick={handleSubmit} >Sign Up</button>
    </div>
  )
}

export default SignUp