import express from "express";
import {
  createProductController,
  deleteProductController,
  fproductCountController,
  getProductController,
  getSingleProductController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  updateProductController,
} from "../Controller/productController.js";
import { isAdmin, requireSignIn } from "../Middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

//filter product
router.post("/product-filters/:page", productFiltersController);

//product count
router.get("/product-count", productCountController);

router.post("/filter-product-count", fproductCountController);
//product per page
router.get("/product-list/:page", productListController);
export default router;
