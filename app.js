const express = require("express");

//Create express app
const app = express();

//Create a listerner port
app.listen(3000);

//Create routes
app.get("/", (res, req) => {
  res.sendFile("index.html", { root: __dirname });
});
