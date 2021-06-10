import express from "express";
import { getProducts, createProduct } from "../controllers/products.js";

const router = express.Router();

//this route is for getting all the products
router.get("/", getProducts);

//this route is for creating a product
router.post("/", createProduct);

export default router;
