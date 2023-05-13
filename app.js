process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err.stack);
});
const bodyParser = require("body-parser");
const express = require("express");
const { allRequires } = require("./src/utils");

// express framework
const app = express();

//  access the api from front end
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// convert buffer to json 
app.use((req,res,next)=>{
  if(req.originalUrl=="/api/v1/orders/webhook"){
   
    next();
  } else{
    bodyParser.json()(req,res,next);
  }
})


// module dotenv to save the improtant data
require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT || 4000;

// all routes of the all project 



allRequires(app);

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err.stack);
});

// listen 
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
