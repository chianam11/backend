const Transformer = require("../core/transformer");
module.exports = class extends Transformer {
  response(instance) {
    return {
      UID: instance.id,
      name: instance.fullname,
      email: instance.email,
      password: "Không có đâu",
      status: instance.status,
      statusText: instance.status ? "Kích hoạt" : "Chưa kích hoạt",
      providerId: instance.provider_id,
      createdAt: instance.created_at,
      updatedAt: instance.updated_at,
    };
  }
}; //Anonymus Class
