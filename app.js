const express = require("express");

//Create express app
const app = express();

//configure a view
app.set("view engine", "ejs");

//Create a listerner port
app.listen(3000);

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

app.get((req, res) => {
  res.status(404).render("404");
});
