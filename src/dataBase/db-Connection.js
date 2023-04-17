const mongoose = require("mongoose");
module.exports.dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => {
      console.log("error 1", err);
    });
};
