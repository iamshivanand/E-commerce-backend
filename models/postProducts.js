import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: String,
  price: Number,
  brand: String,
  description: String,
  category: [String],
  image: String,
  color: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const postProduct = mongoose.model("postProduct", productSchema);

export default postProduct;
