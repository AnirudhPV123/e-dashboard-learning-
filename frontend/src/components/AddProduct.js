import React, { useState } from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router-dom'

function AddProduct() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const addProduct =async (e)=>{

        if(!name || !price || !category || !company){
            setError(true)
        }else{

        const userId = JSON.parse(localStorage.getItem('user'))._id
        
        // Axios.post('http://localhost:5000/add-product',{
    
        // name,
        // price,
        // category,
        // userId,
        // company,
        //     headers:{
        //         authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        //     }
        // })


        let result = await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify({name,price,category,userId,company}),
            headers:{
                'Content-Type':'Application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })

        if(result){
            navigate('/products')
        }else{
            alert("Product not added...")
        }
    



    }
    }
  return (
    <div className='add-product' >
         <h1>Add Product</h1>

<input className='inputBox' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter product name' /><br />
{error && !name && <span className='input-validation' >Enter valid name</span>}

<input className='inputBox' type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Enter product price' /><br />
{error && !price && <span className='input-validation' >Enter valid name</span>}

<input className='inputBox' type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Enter product category' /><br />
{error && !category && <span className='input-validation' >Enter valid name</span>}

<input className='inputBox' type="text" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder='Enter company name' /><br />
{error && !company && <span className='input-validation' >Enter valid name</span>}


<button className='signUp-button' onClick={addProduct} >Add Product</button>
    </div>
  )
}

export default AddProduct