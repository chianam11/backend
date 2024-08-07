const express = require("express");
const router = express.Router();

const productControllers = require("@controllers/admin/api/v1/products.controller.js");
const productRouter = (app) => {
  router.get("/", productControllers.index);
  router.get("/product-details/:id",productControllers.productDetails)
  
  router.post("/checkout", productControllers.handleCheckout);


  return app.use("/api/v1/admin/products", router);
};

module.exports = productRouter;
