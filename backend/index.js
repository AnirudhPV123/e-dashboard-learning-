const express = require('express')
const app = express()
const cors = require('cors')

const User = require('./db/users')
const product = require('./db/products')

const Jwt = require('jsonwebtoken')
const jwtKey='123'  //any secret key


app.use(express.json())
app.use(cors())

app.post('/signup', async (req, res) => {
    let user = await User.insertMany(req.body)
    Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send({result:"something went wrong"})
        }
        res.send({user,auth:token})
    })
    
})

app.post('/login', async (req, res) => {

    if (req.body.email && req.body.password) {
        const user = await User.findOne(req.body).select('-password')  // select use to avoid password when find

        if (user) {
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({result:"something went wrong"})
                }
                res.send({user,auth:token})
            })
        } else {
            res.send()
        }
    } else {
        res.send()
    }
})

app.post('/add-product',verifyToken, async (req, res) => {
    let data = await product.insertMany(req.body) 
    console.log(data)
    res.send(data)
})

app.get('/products',verifyToken, async (req, res) => {
    let products = await product.find()

    if (products.length > 0) {
        res.send(products)
    } else {
        res.send("No product found")
    }
})

app.delete('/products/:id',verifyToken, async (req, res) => {
    let result = await product.deleteOne({ _id: req.params.id })
    res.send(result)
})

app.get('/update-details/:id',verifyToken, async (req, res) => {
    let data = await product.findOne({ _id: req.params.id })
    if (data) {
        res.send(data)
    } else {
        res.send()
    }
})

app.put('/update/:id', verifyToken, async(req,res)=>{
   let result = await product.updateOne({_id: req.params.id},{$set:req.body})
    res.send(result)
})

app.get('/search/:key',verifyToken, async(req,res)=>{
    let data = await product.find({
        "$or": [
            {
                name:{$regex: req.params.key}
            }
        ]
    })
    res.send(data)
})


function verifyToken(req,res,next){
    let token = req.headers['authorization']  //getting token 
    if(token){
        token = token.split(' ')[1]  //token comes as bearer 38uijdo etc so jut split bearer
        Jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                res.send({result:"Please provide valid token"})
            }else{
                next()
            }
        })
    }else{
        res.send({result:"Please provide token"})
    }
    
}


app.listen(5000)     