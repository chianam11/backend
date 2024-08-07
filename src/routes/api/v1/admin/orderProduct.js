const express = require("express");
const router = express.Router();
const orderController = require("@controllers/admin/api/v1/orderProduct.controller.js")
module.exports = (app)=>{
router.get("/",orderController.index)


return app.use("/api/v1/admin/orders",router)    
}