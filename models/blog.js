const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const CampGroundSchema=new Schema({
    title:String,
    price:Number,
    image:String,
    description:String,
    location:String
})

const BlogSchema=new Schema({
    title:String,
    author:String,
    description:String,
    image:String,
})

// module.exports=mongoose.model('Campground',CampGroundSchema);
module.exports=mongoose.model('Blog',BlogSchema);