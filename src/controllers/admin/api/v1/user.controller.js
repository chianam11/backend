const { User } = require("../../../models/index");
const { successResponse, errorResponse } = require("../../../helpers/response");
const { Op } = require("sequelize");
const { object, string } = require("yup");
const bcrypt = require("bcrypt");
const UserTransformer = require("../../../transformers/user.transformer");
module.exports = {
  index: async (req, res) => {
    const {
      sort = "id",
      order = "asc",
      status,
      q,
      page = 1,
      limit,
    } = req.query;
    const filter = {};
    if (status === "true" || status === "false") {
      filter.status = status === "true";
    }
    if (q) {
      filter[Op.or] = {
        fullname: {
          [Op.iLike]: `%${q}%`,
        },
        email: {
          [Op.iLike]: `%${q}%`,
        },
      };
    }
    const options = {
      order: [[sort, order]],
      // attributes: { exclude: "password" },
      where: filter,
    };
    if (Number.isInteger(+limit) && Number.isInteger(+page)) {
      const offset = (page - 1) * limit;
      options.limit = limit;
      options.offset = offset;
    }
    try {
      const { rows: users, count } = await Cache.remember(
        "users-cache",
        60 * 60 * 24,
        () => {
          return User.findAndCountAll(options);
        }
      );

      return successResponse(res, 200, "Success", new UserTransformer(users), {
        count,
      });
    } catch (e) {
      return errorResponse(res, 500, "Server Error");
    }
  },

  find: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await Cache.remember(
        `user_cache_${id}`,
        60 * 60 * 24,
        () => {
          return User.findByPk(id, {
            attributes: { exclude: "password" },
          });
        }
      );
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }
      return successResponse(res, 200, "Success", new UserTransformer(user));
    } catch (e) {
      return errorResponse(res, 500, "Server Error");
    }
  },
  store: async (req, res) => {
    const schema = object({
      fullname: string().required("Tên không được để trống"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("check-unique", "Email đã được sử dụng", async (value) => {
          const user = await User.findOne({ where: { email: value } });
          return !user;
        }),
      password: string().required("Mật khẩu không được để trống"),
      status: string().test(
        "check-status",
        "Trạng thái không hợp lệ",
        (value) => {
          return value === "true" || value === "false";
        }
      ),
    });
    try {
      const body = await schema.validate(req.body, {
        abortEarly: false,
      });
      const user = await User.create({
        fullname: body.fullname,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        status: body.status === "true",
      });
      return successResponse(res, 201, "Success", user);
    } catch (e) {
      const errors = Object.fromEntries(
        e.inner.map(({ path, message }) => [path, message])
      );
      return errorResponse(res, 400, "Bad Request", errors);
    }
  },
  update: (req, res) => {
    const method = req.method;
    if (method === "PUT") {
      //PUT
      const body = {
        name: null,
        email: null,
        password: null,
        status: null,
        ...req.body,
      };
    } else {
      //PATCH
      const body = req.body;
    }
  },
  delete: (req, res) => {},
  deletes: (req, res) => {},
};
