const { Schema, model,  } = require("mongoose");
const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "coupon code requires"],
      trim: true,
      unique: [true, "coupon code unique"],
    },
    type: {
      type: String,
      require:true
    },
    description: {
        type: String,
        require:true
    },
    image:{
        type: String,
    },
    cloudinary_id: String,
    pros:{
        type: String,
        require:true
    },
    cons:{
        type: String,
        require:true
    }
  },
  { timestamps: true }
);
module.exports = model("Machinee", schema);
