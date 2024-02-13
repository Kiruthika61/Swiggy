const mongoose=require('mongoose')

const RestaurantSchema=new mongoose.Schema({
     areaName:{
        type:String,
        // required:true
    },
    avgrating:{
        type:Number,
        // required:true
    },
    costForTwo:{
        tpye:Number,
        // required:true
    },
    Cuisines:{
        type:Array,
        // required:true
    },
    name:{
        type:String,
        // required:true
    }
})


const userSchema = new mongoose.Schema({
    contact : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    userName : {
        type : String
    },
})
const Users = mongoose.model('userDetail', userSchema)

const Restaurant= mongoose.model('restaurantList',RestaurantSchema)
module.exports ={Restaurant,Users}