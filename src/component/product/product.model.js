const { Schema, model, Types } = require("mongoose");
const schema = Schema(
  {
    name: {
      type: String,
      required: [true, "product name requires"],
      trim: true,
      unique: [true, "product name unique"],
      minlength: 2,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    quantity: {
      type: Number,
      required: [true, "product quantity requires"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "product description requires"],
      trim: true,
      minlength: 10,
    },
    price: {
      type: Number,
      required: [true, "product price requires"],
    },
    priceAfterDiscount: {
      type: Number,
      required: [true, "product price After discount requires"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    countryOfOrigin:{
      type: String,
      required: [true, "product country requires"],
      trim: true,
    },
    image: String,
    cloudinary_id: String,
    category: {
      type: Types.ObjectId,
      ref: "category",
      required: [true, "product category requires"],
    },
    brand: {
      type: Types.ObjectId,
      ref: "brand",
      required: [true, "product brand requires"],
    },
    averageRating: {
      type: Number,
      min: [1, "ratingAvarege must be grater than or equal 1"],
      max: [5, "ratingAvarege must be less than or equal  5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    machine:{
      type: Types.ObjectId,
      ref: "machine",
    }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
schema.virtual("review", {
  ref: "review",
  localField: "_id",
  foreignField: "product",
});
schema.pre("findOne", function () {
  this.populate("review");
});

module.exports = model("product", schema);
