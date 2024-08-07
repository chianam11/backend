const { Administrator, UserOrder, PhoneByBrand, TrackingDetail } = require("@models/index");
const { successResponse, errorResponse } = require("@helpers/response.js");

module.exports = {
  index: async (req, res) => {
    const data = await PhoneByBrand.findAll();
    res.json(data);
  },

  handleCheckout: async (req, res) => {
    const body = req.body;
    const user = await Administrator.findByPk(body.user_id);
    if (!user) {
      return errorResponse(res, 401, "Unauthorized");
    }
    try {
      // Tạo một đơn hàng mới
      const newOrder = await UserOrder.create({ user_id: body.user_id });

      // Thêm các sản phẩm vào đơn hàng
      for (const item of body.data) {
        const { phone_id, quantity } = item;

        // Kiểm tra xem sản phẩm đã tồn tại chưa, nếu chưa thì tạo mới
        let product = await PhoneByBrand.findOne({ where: { phone_id } });
        if (!product) {
      return errorResponse(res, 410, "Gone");
         
        }
 await TrackingDetail.create({
          order_id: newOrder.id,
          product_id: product.phone_id,
          quantity,
          user_id:body.user_id
        });
        // Thêm sản phẩm vào đơn hàng với số lượng
       
      }
console.log(body.user_id);
      return successResponse(res, 200, "Order created successfully", { orderId: newOrder.id });
    } catch (error) {
      console.log("heleo");
      console.error(error);
      return errorResponse(res, 500, "Internal Server Error");
    }
  },

  productDetails: async (req, res) => {
    const { id } = req.params;
    const data = await PhoneByBrand.findByPk(id);
    res.json(data);
  }
};
