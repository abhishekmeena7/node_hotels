const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;

const MenuItem = require("./models/MenuItem");

app.get("/", (req, res) => {
  return res.send("hello from home page express");
});

app.get("/about", (req, res) => {
  return res.send("hello from about page");
});

app.get("/contact", (req, res) => {
  return res.send("how can i help you sir ??");
});






//import the router files
const personRoutes = require('./routes/personRoute');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person', personRoutes)
app.use('/menu', menuItemRoutes)




app.listen(PORT, () => {
  console.log("listening on port 8000")
});
