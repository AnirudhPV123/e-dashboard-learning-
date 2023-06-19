import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

function Products() {
    const [products, setProducts] = useState([])
    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async () => {
        Axios.get('http://localhost:5000/products', {
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`  //this is used to send token to the backend when calling and api to check whether the token is matching to avoid hacking
        }

        }).then(async (products) => {
            products = products.data
            setProducts(products)
        })
    }

    const handleDelete =(productId)=>{
        Axios.delete(`http://localhost:5000/products/${productId}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        }).then((result)=>{
            if(result){
            getProduct()   //it is used to call getProduct function which refresh like things
        }
        })
    }

    const handleSearch=(e)=>{
        let key = e.target.value
        if(key){
            Axios.get(`http://localhost:5000/search/${key}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
            }).then((result)=>{
                if(result){
                setProducts(result.data)
            }
            })
        }else{
            getProduct()
        }
    }


    return (
        <div className='product-list'>
              <h2>Product List</h2>
                <input type="" placeholder='Search products' className='search-input-box' onChange={handleSearch} />

            <ul >
                <li>No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
                
            </ul>
            {
            products.length>0 ? products.map((item,index) => 
                    <ul key={item._id} >
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button onClick={()=>handleDelete(item._id)} >delete</button>
                            <Link to={'/update/'+item._id} >Update</Link>
                            </li>
                        
                    </ul>
                ) : <h3>Product not found</h3>
            }
        </div>
    )
}

export default Products