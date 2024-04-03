const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const session = require('express-session');
const {v4: uuidv4} = require('uuid');
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

//Middleware for images and logging
app.use(express.static('public'));
app.use(express.static('css'));
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"));
app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: false
}))

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

//Admin user routing

const adminCredentials = {
  name: 'Obakeng',
  password: 'Dusani@0180'
}
app.post('/admin/login',(req, res)=>{
  if(req.body.name === adminCredentials.name && req.body.password === adminCredentials.password ){
    req.session.user = req.body.name;
   res.redirect('/admin/dashboard');
  }else{
    res.end('Invalid username');
  }
})

app.get('/admin/dashboard',(req, res)=>{
  if(req.session.user){
    res.render('dashboard', {user: req.session.user})
  }
})

app.get('/admin/logout', (req, res)=>{
  req.session.destroy((data)=>{
    res.redirect('/admin')
  })
})



app.get('/admin',(req, res)=>{
  res.status(200).render('admin');
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
