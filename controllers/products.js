//importing the models
import { response } from "express";
import postProduct from "../models/postProducts.js";

export const getProducts = async (request, response) => {
  response.json(response.paginatedResult);
  // try {
  //   const products = await postProduct.find();
  //   response.status(200).json(products);
  // } catch (error) {
  //   console.log(error.message);
  //   response.status(404).json({ message: error.message });
  // }
};

export const createProduct = async (request, response) => {
  const product = request.body;
  const newProduct = new postProduct(product);
  try {
    await newProduct.save();
    response.status(201).json(newProduct);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
export const searchProducts = async (request, response) => {
  // console.log("params", request.params.name);
  var regex = new RegExp(request.params.name, "gi");
 
  try {
    const results = await postProduct.find({ title: regex });
    response.status(200).json(results);
  } catch (err) {
    response.status(404).json(err);
  }
};
