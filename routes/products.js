import express from "express";
import { getProducts, createProduct,searchProducts } from "../controllers/products.js";
import postProduct from "../models/postProducts.js";
const router = express.Router();

//this route is for getting all the products
router.get("/", paginatedResults(postProduct), getProducts);

//this route is for creating a product
router.post("/", createProduct);

//this route is for the search
router.get("/search/:name",searchProducts);

export default router;
function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }
    if (endIndex < await model.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit,
      };
    }
    try {
      results.result = await model.find().limit(limit).skip(startIndex).exec();
      res.paginatedResult = results;
      next();
    } catch (error) {
      res.status(500).json(error);
    }
  };
}
