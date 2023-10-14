const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const BlogSchema=new Schema({
    title:String,
    author:String,
    description:String,
    image:String,
})

// module.exports=mongoose.model('Campground',CampGroundSchema);
module.exports=mongoose.model('Blog',BlogSchema);