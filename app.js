process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err.stack);
});
const bodyParser = require("body-parser");
const { webhookCheckout } = require("./src/component/order/order.service");
const express = require("express");


// express app
const app = express();

//webhook
app.post('/webhook', express.raw({ type: 'application/json' }, webhookCheckout));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

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
