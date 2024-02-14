const bodyParser=require('body-parser')
const express =require('express')
const mongoose =require('mongoose')
const cors=require('cors')

const{Restaurant, Users}= require('./schema.cjs')

const app=express()
app.use(bodyParser.json())
app.use(cors())


async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://Kiruthika_61:Kiruthika61@cluster0.njdgdf4.mongodb.net/Swiggy?retryWrites=true&w=majority')
        console.log('DB connection established ;)')
        const port = process.env.PORT || 4000
        app.listen(port, function() {
            console.log(`Listening on port ${port}...`)
        })
    } catch(error) {
        console.log(error)
        console.log('Couldn\'t establish connection :(')
    }
}
connectToDb()

app.post('/add-restaurant', async function(request, response){
    try{await Restaurant.create({
    "areaName":request.body.areaName,
    "avgRating":request.body.avgRating,
    "costForTwo":request.body.CostForTwo,
    "Cuisines":request.body.Cuisines,
     "name":request.body.name
   })
   response.status(201).json({
    "status" : "success",
    "message" : "restaurant entry successful"
})
}catch(error){
    response.status(500).json({
         "status":"failure",
         "message":"internai server error"
    })
}})

app.get('/get-restaurant-details', async function(request, response) {
    try {
        const restaurantDetails = await Restaurant.find()
        response.status(200).json(restaurantDetails)
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch",
            "error" : error
        })
    }
})

app.post('/create-new-user', async function(request, response) {
    try {
         await Users.create({
             "userName" : request.body.userName,
             "email" : request.body.email,
             "password" : request.body.password,
             "contact" : request.body.contact
         })
         response.status(201).json({
         "status" : "success",
         "message" : "user created"
         })
    } catch(error) {
         response.status(500).json({
             "status" : "failure",
             "message" : "internal server error"
         })
    }
 })
 
 app.post('/validate-user', async function(request, response) {
     try {
         const user = await Users.findOne({
             "email" : request.body.email,
             "password" : request.body.password 
         })
         if(user) {
             response.status(200).json({
                 "message" : "valid user"
             })
         } else {
             response.status(401).json({
                 "message" : "invalid user"
             })
         }
     } catch(error) {
         response.status(500).json({
             "message" : "internal server error"
         })
     }
 })

 app.delete('/delete-restaurant-details/:id', async function(request, response){
    try{
        const restuarant=await Restaurant.findById
        if(restuarant){
            await Restaurant.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "status":"success",
                "message":"deleted successfully"
            })
        }else { //restaurant : null
            response.status(404).json({
                "status" : "failure",
                "message" : "entry not found"
            })
        }
    }catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"could not delete",
            "error":error
        })
    }
 })