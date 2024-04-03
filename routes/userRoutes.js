const express = require('express');
const User = require("../models/user");
const Contact = require("../models/contact");
const router = express.Router();


router.get('/users',(req, res) => {
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
router.get('/all-users',(req, res)=>{
  User.find()
    .then((data)=>{
      res.send(data)
    }).catch((err)=>{
    console.log(err);
  })
});

router.get("/", (req, res) => {
  res.render("index");
  res.status(200);
});

router.get("/about", (req, res) => {
  res.status(200).render("about");
});

router.get("/contact", (req, res) => {
  res.status(200).render("contact");
});

router.get("/register", (req, res) => {
  res.status(200).render("register");
});

router.get("/login", (req, res) => {
  res.status(200).render("login");
});

//Get contact requests from user
router.post('/contact',(req,res)=>{
  const contact = new Contact(req.body);
  contact.save()
    .then((data)=>{
      res.redirect('/contact')
    }).catch((err)=>{
    console.log(err);
  })
})


router.get("/product", (req, res) => {
  res.status(200).render("product");
});

//Request to get users from form
router.post('/users',(req, res)=>{
  const users = new User(req.body);
  users.save()
    .then((data)=>{
      res.redirect('/')
    }).catch((err)=>{
    console.log(err)
  })
})

module.exports = router;
