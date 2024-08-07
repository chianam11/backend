const { TrackingDetail, Administrator, UserOrder, PhoneByBrand, sequelize } = require("@models/index.js");
const { successResponse, errorResponse } = require("@helpers/response.js");

module.exports = {
  index: async (req, res) => {
    try {
      const orders = await UserOrder.findAll({
        attributes: ['id', 'user_id', 'created_at', 'updated_at'],
        include: [
          {
            model: Administrator,
            attributes: ['id', 'first_name', 'last_name', 'email']
          },
          {
            model: TrackingDetail,
            attributes: [
              'id', 
              'product_id',
              [sequelize.fn('SUM', sequelize.col('quantity')), 'total_quantity']
            ],
            include: [
              {
                model: PhoneByBrand,
                attributes: ['id', 'phone_id', 'image_url', 'price']
              }
            ],
            group: ['TrackingDetail.id', 'TrackingDetail.product_id', 'PhoneByBrand.id', 'PhoneByBrand.phone_id', 'PhoneByBrand.image_url', 'PhoneByBrand.price']
          }
        ],
        group: [
          'UserOrder.id',
          'UserOrder.user_id',
          'UserOrder.created_at',
          'UserOrder.updated_at',
          'Administrator.id',
          'Administrator.first_name',
          'Administrator.last_name',
          'Administrator.email',
          'TrackingDetails.id',
          'TrackingDetails.product_id',
          'TrackingDetails->PhoneByBrand.id',
          'TrackingDetails->PhoneByBrand.phone_id',
          'TrackingDetails->PhoneByBrand.image_url',
          'TrackingDetails->PhoneByBrand.price'
        ],
        raw: true
      });

      // Định dạng và cấu trúc lại dữ liệu
      const formattedOrders = orders.reduce((acc, order) => {
        const existingAdmin = acc.find(o => o.Administrator.id === order['Administrator.id']);
        
        const trackingDetail = {
          id: order['TrackingDetails.id'],
          product_id: order['TrackingDetails.product_id'],
          total_quantity: order['TrackingDetails.total_quantity'],
          PhoneByBrand: {
            id: order['TrackingDetails.PhoneByBrand.id'],
            phone_id: order['TrackingDetails.PhoneByBrand.phone_id'],
            image_url: order['TrackingDetails.PhoneByBrand.image_url'],
            price: order['TrackingDetails.PhoneByBrand.price']
          }
        };

        if (existingAdmin) {
          existingAdmin.TrackingDetails.push(trackingDetail);
        } else {
          acc.push({
            id: order.id,
            user_id: order.user_id,
            created_at: formatDate(order.created_at),
            updated_at: formatDate(order.updated_at),
            Administrator: {
              id: order['Administrator.id'],
              first_name: order['Administrator.first_name'],
              last_name: order['Administrator.last_name'],
              email: order['Administrator.email']
            },
            TrackingDetails: [trackingDetail]
          });
        }

        return acc;
      }, []);

      return successResponse(res, 200, "Orders fetched successfully", formattedOrders);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, "Internal Server Error");
    }
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};
