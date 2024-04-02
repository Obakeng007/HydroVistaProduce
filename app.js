const express = require("express");

//Create express app
const app = express();

//Create a listerner port
app.listen(3000);

//Create routes
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
  res.status(200);
});

app.get("/product", (req, res) => {
  res.sendFile("product.html", { root: __dirname });
});
