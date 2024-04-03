const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const User = require('./models/user.js');
const Contact = require('./models/contact');


//Create express app
const app = express();
const dbUri = 'mongodb+srv://Dusani:KmyapCcJrGWQlbh1@hydrovista.3i6p94h.mongodb.net/hydrovista?retryWrites=true&w=majority&appName=HydroVista';

mongoose.connect(dbUri)
  .then((result) =>{
    app.listen(3000);
  }).catch((err) => {
    console.log(err);
})

//configure a view
app.set("view engine", "ejs");

//Route for user, adding user into database
app.get('/users',(req, res) => {
  const user = new User({
    firstName: 'Obakeng',
    lastName: 'Dusani',
    email: 'blazin@mail.com',
    postalAddress:'Lot 895,Nlapkhwane',
    phone: 1234,
    gender: 'M',
    password: '346734'
});

  user.save()
    .then((data)=>{
    res.send(data)
  }).catch((err)=>{
  console.log(err);
  });
})

//retrieving all users from the database
app.get('/all-users',(req, res)=>{
  User.find()
    .then((data)=>{
      res.send(data)
    }).catch((err)=>{
      console.log(err);
  })
});

//Middleware for images and logging
app.use(express.static('public'));
app.use(express.static('css'));
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"));

//Create routes
app.get("/", (req, res) => {
  res.render("index");
  res.status(200);
});

app.get("/about", (req, res) => {
  res.status(200).render("about");
});

app.get("/contact", (req, res) => {
  res.status(200).render("contact");
});

app.get("/register", (req, res) => {
  res.status(200).render("register");
});

app.get("/login", (req, res) => {
  res.status(200).render("login");
});

app.get("/product", (req, res) => {
  res.status(200).render("product");
});

//Request to get users from form
app.post('/users',(req, res)=>{
  const users = new User(req.body);
  users.save()
    .then((data)=>{
      res.redirect('/')
    }).catch((err)=>{
      console.log(err)
  })
})

//Get contact requests from user
app.post('/contact',(req,res)=>{
  const contact = new Contact(req.body);
  contact.save()
    .then((data)=>{
      res.redirect('/contact')
    }).catch((err)=>{
      console.log(err);
  })
})

app.use((req, res) => {
  res.status(404).render("404");
});
