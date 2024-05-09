const express =require('express');
const usersRoute = require('./routes/users/usersRoute');
const app=express();
const cors= require("cors");
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger.js");
const bodyParser = require('body-parser');
const dashboardRoute = require('./routes/users/dashboardRoute');

require("./config/dbConnect");


// Middleware
app.use(bodyParser.json());
app.get('/', (req, res) => {
  console.log(req.useragent)
  res.send('Hey this is my API running 🥳')
})


app.use(cors()) // Use this after the variable declaration
// middlewares
app.use(express.json()) //pass incoming data
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));


//routes

//user routes:
app.use("/users",usersRoute);


app.use("/dashboard",dashboardRoute);


//Error handlers


//listen to the server.
const port = process.env.PORT||10000;
app.listen(port,console.log(`SERVER IS UP AND RUNNING ON PORT ${port}`));




