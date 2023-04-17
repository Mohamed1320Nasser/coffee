const mongoose = require("mongoose");
module.exports.dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to Mongodb atls");
    })
    .catch((err) => {
      console.log(process.env.MONGODB_URI);
      console.log(" Error to connect to Mongodb" + err.message);
    });
};
