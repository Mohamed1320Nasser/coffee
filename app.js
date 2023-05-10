process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err.stack);
});
const bodyParser = require("body-parser");
const express = require("express");
// express app
const app = express();

// cors
const cors = require("cors");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
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
const { allRequires } = require("./src/utils");


allRequires(app);

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err.stack);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
