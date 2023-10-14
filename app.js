// const express=require('express');
// const app=express();
// const path=require('path');
// const ejsMate=require('ejs-mate');
// const Blog=require('./models/blog');
// const mongoose=require('mongoose');
// const methodOverride=require('method-override');

// mongoose.connect('mongodb://127.0.0.1:27017/blog-hub')

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// });

// app.engine('ejs',ejsMate);

// app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'views'))

// app.use(express.urlencoded({extended:true}));
// app.use(methodOverride('_method'));

// app.get('/',(req,res)=>{
//     res.render('home');
// })

// app.get('/campgrounds',async (req,res)=>{
//     const campgrounds=await Campground.find({});
//     res.render('campgrounds/index',{campgrounds});
// })

// app.get('/campgrounds/new',async (req,res)=>{
//     res.render('campgrounds/new');
// })

// app.get('/campgrounds/:id',async (req,res)=>{
//     const campground=await Campground.findById(req.params.id);
//     res.render('campgrounds/show',{campground});
// })

// app.get('/campgrounds/:id/edit',async(req,res)=>{
//     const campground=await Campground.findById(req.params.id);
//     res.render('campgrounds/edit',{campground});
// })

// app.post('/campgrounds',async (req,res)=>{
//     const campground=new Campground(req.body.campground);
//     await campground.save();
//     res.redirect(`/campgrounds/${campground._id}`);
// })

// app.put('/campgrounds/:id',async (req,res)=>{
//     const {id}=req.params;
//     const campground=await Campground.findByIdAndUpdate(id,{...req.body.campground});
//     res.redirect(`/campgrounds/${id}`);
// })

// app.delete('/campgrounds/:id',async (req,res)=>{
//     const {id}= req.params;
//     await Campground.findByIdAndDelete(id);
//     res.redirect('/campgrounds');
// })

// app.listen(3000,()=>{
//     console.log("Serving on port 3000");
// })

const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const Blog = require("./models/blog"); // Import your Blog model
const mongoose = require("mongoose");
const methodOverride = require("method-override");

mongoose.connect("mongodb://127.0.0.1:27017/blog-hub");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.engine("ejs", ejsMate);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.render("home");
});

// Update route for displaying blogs
app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find({});
  res.render("blogs/index", { blogs });
});

app.get("/blogs/new", (req, res) => {
  res.render("blogs/new");
});

app.get("/blogs/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("blogs/show", { blog });
});

app.get("/blogs/:id/edit", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("blogs/edit", { blog });
});

app.post("/blogs", async (req, res) => {
  const blog = new Blog(req.body); // Assuming the form fields match the Blog schema
  await blog.save();
  res.redirect(`/blogs/${blog._id}`);
});

app.put("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndUpdate(id, req.body); // Assuming the form fields match the Blog schema
  res.redirect(`/blogs/${id}`);
});

app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.redirect("/blogs");
});

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
