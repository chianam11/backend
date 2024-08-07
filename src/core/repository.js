//Base Repository
module.exports = class {
  constructor() {
    this.model = this.getModel();
  }
  create(data) {
    //Gọi hàm model
    return this.model.create(data);
  }
  update(data = {}, condition = {}, r = {}) {
    //Gọi hàm model
    return this.model.update(data, condition, r);
  }
  updateByPk(id) {
    //Gọi hàm model
    return this.model.update(data, { where: { id } });
  }
  delete(condition = {}) {
    //Gọi hàm model
    return this.model.destroy(condition);
  }
  deleteByPk(id) {
    //Gọi hàm model
    return this.model.destroy({ where: { id } });
  }
  find(condition = {}) {
    //Gọi hàm model
    return this.model.findOne(condition);
  }
  findByPk(id, condition = {}) {
    //Gọi hàm model
    return this.model.findByPk(id, condition);
  }
  findAll(options = {}) {
    //Gọi hàm model
    return this.model.findAll(options);
  }
  findAndCountAll(options = {}) {
    return this.model.findAndCountAll(options);
  }
  findOrCreate(options = {}) {
    return this.model.findOrCreate(options);
  }
};
