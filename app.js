const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const session = require('express-session');
const {v4: uuidv4} = require('uuid');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');


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

//admin routes
app.use(adminRoutes);

//Create routes
app.use(userRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});
