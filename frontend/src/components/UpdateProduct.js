


import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

function UpdateProduct() {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [company, setCompany] = useState('')
    const [error, setError] = useState(false)
    const params = useParams()                           //its used to get the id passed from app.js
const navigate= useNavigate()
    useEffect(() => {
      updateDetails()
    }, [])
    
    const updateDetails= ()=>{
        Axios.get(`http://localhost:5000/update-details/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }).then((details)=>{
            setName(details.data.name)
            setPrice(details.data.price)
            setCategory(details.data.category)
            setCompany(details.data.company)
        })
    }

    const updateProduct = async(e)=>{

        if(!name || !price || !category || !company){
            setError(true)
        }else{

        
            let result = await fetch(`http://localhost:5000/update/${params.id}`,{
                method:'Put',
                body:JSON.stringify({name,price,category,company}),
                headers:{
                    'Content-Type':'Application/json',
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
        
            if(result){
                navigate('/products')
            }else{
                alert("Product is not updated...")
            }
        



    }
    }
  return (
    <div className='add-product' >
         <h1>Update Product</h1>

<input className='inputBox' type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter product name' /><br />
{error && !name && <span className='input-validation' >Enter valid name</span>}

<input className='inputBox' type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder='Enter product price' /><br />
{error && !price && <span className='input-validation' >Enter valid name</span>}

<input className='inputBox' type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder='Enter product category' /><br />
{error && !category && <span className='input-validation' >Enter valid name</span>}

<input className='inputBox' type="text" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder='Enter company name' /><br />
{error && !company && <span className='input-validation' >Enter valid name</span>}


<button className='signUp-button' onClick={updateProduct} >Add Product</button>
    </div>
  )
}

export default UpdateProduct