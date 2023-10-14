const express = require("express");
const app = express();
const path = require("path");
const bcrypt=require("bcrypt");
const ejsMate = require("ejs-mate");
const Blog = require("./models/blog"); // Import your Blog model
const UserCollection = require("./models/users"); //importing the users collection
const mongoose = require("mongoose");
const methodOverride = require("method-override");
// const hbs=require("hbs");
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
app.use(express.json());

app.get("/", (req, res) => {
  res.render("authentication/templates/login");
});

app.get("/signup", (req, res) => {
  res.render("authentication/templates/signup");
});


app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    // Hash the password using bcrypt
    password: await bcrypt.hash(req.body.password, 10), // 10 is the number of salt rounds
  };

  await UserCollection.insertMany([data]);

  res.render("home");
});

app.post("/login", async (req, res) => {
  try {
    const user = await UserCollection.findOne({ name: req.body.name });
    if (user) {
      const passwordMatch = await bcrypt.compare(req.body.password, user.password);
      if (passwordMatch) {
        res.render("home");
      } else {
        res.send('<script>alert("Wrong Password"); window.location="/";</script>');
      }
    } else {
      res.send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update route for displaying blogs
app.get("/home",(req,res)=>{
  res.render("home");
})

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
