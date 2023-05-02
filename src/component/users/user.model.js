const bcrypt = require("bcrypt");
const { Schema, model, Types } = require("mongoose");
const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "user name requires"],
      minlength: 2,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "user email requires"],
      trim: true,
      unique: [true, "user email unique"],
    },
    phone: {
      type: String,
      required: [true, "user phone requires"],
    },
    password: {
      type: String,
      required: [true, "user password requires"],
      minlength: [6, "less than chracter length must be 6"],
    },
    passwordChangeAt: Date,
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dw0cormzj/image/upload/v1679430518/Youth%20Welfare/Student/profile_dteqac.jpg",
    },
    cloudinary_id: {
      type: String,
      default: "default",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    Isverified: {
      type: Boolean,
      default: false,
    },
    emailToken: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    wishlist: [
      {
        type: Types.ObjectId,
        ref: "product",
      },
    ],
    addresses: [
      {
        _id: { type: Types.ObjectId },
    
        details: String,
        street: String,
        phone: String,
        city: String,
      },
    ],
  },
  { timestamps: true }
);
schema.pre("save", function () {
  this.password = bcrypt.hashSync(
    this.password,
    Number(process.env.saltRounds)
  );
});
schema.pre("findOneAndUpdate", function () {
  if (!this._update.password) return;
  this._update.password = bcrypt.hashSync(
    this._update.password,
    Number(process.env.saltRounds)
  );
});
module.exports = model("user", schema);
