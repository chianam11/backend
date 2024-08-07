const {
  errorResponse,
  successResponse,
} = require("../../../../helpers/response");
const {
  Blacklist,
  UserToken,
  Administrator,
  Role,
} = require("../../../../models/index");
const {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} = require("../../../../utils/jwt");
const Yup = require('yup');
const bcrypt = require('bcrypt');
module.exports = {
  login: async (req, res) => {
    console.log(req.body);
    //1. Validate
    const { username, password } = req.body;
    if (!username || !password) {
      return errorResponse(
        res,
        400,
        "Bad Request",
        "Vui lòng nhập lại username và password"
      );
    }
    //2. Kiểm tra username tồn tại
    try {
      const administrator = await Administrator.findOne({
        where: { username },
      });
      if (!administrator) {
        return errorResponse(res, 400, "Bad Request", {
          username: "username không tồn tại",
        });
      }

      //3. Lấy password hash
      const { password: hash } = administrator;
      //4. So sánh password hash với password từ request
      if (!bcrypt.compareSync(password, hash)) {
        return errorResponse(res, 400, "Bad Request", {
          Unauthorized: "Tài  khoản hoặc mật khẩu không chính xác",
        });
      }
      const roles = await administrator.getRoles();
      const roleList = [];
      if (roles) {
        for (const { id } of roles) {
          const okRoles = await Role.findByPk(id);
          const RolePermission = await okRoles.getPermissions();

          roleList.push({
            id: okRoles.id,
            name: okRoles.name,
            permissions: RolePermission.map(({ value }) => value),
          });
        }
      }
      //5. Tạo token bằng JWT
      const accessToken = createAccessToken({
        user:{
          name:administrator.first_name+" "+administrator.last_name,
          phone:administrator.phone,
          email:administrator.email
          
       },
        user_id: administrator.id,
        roleList,
      });
      const refreshToken = createRefreshToken();
      //Thêm refreshToken vào database
      await UserToken.create({
        refresh_token: refreshToken,
        user_id: administrator.id,
      });
      //6. Trả về Response
      if (!accessToken) {
        return errorResponse(res, 500, "Server Error");
      }

      return successResponse(res, 200, "Success", {
       
     
        accessToken,
        refreshToken,
        roleList,
      });
    } catch {
      return errorResponse(res, 500, "Server Error");
    }
  },
  profile: (req, res) => {
    return successResponse(res, 200, "Success", req.user);
  },
  logout: async (req, res) => {
    const { accessToken, exp } = req.user;
    const [blacklist] = await Blacklist.findOrCreate({
      where: { token: accessToken },
      defaults: { token: accessToken, expired: exp },
    });
    if (blacklist) {
      return successResponse(res, 200, "Success");
    }
    return errorResponse(res, 500, "Server Error");
  },
  refresh: async (req, res) => {
    try {
      const refreshToken = req.body.refresh_token;
      const userToken = await UserToken.findOne({
        where: { refresh_token: refreshToken },
      });
      if (!userToken) {
        return errorResponse(res, 400, "Bad Request");
      }
      //Nếu tồn tại trong Database --> Lấy user_id
      const { user_id: user_id } = userToken;

      //Verify Token --> Kiểm tra hết hạn
      const decoded = verifyToken(refreshToken);
      if (!decoded) {
        return errorResponse(res, 401, "Unathorize");
      }
      //Khởi tạo accessToken mới
      const administrator = await Administrator.findByPk(user_id);
      const roles = await administrator.getRoles();
      const roleList = [];
      if (roles) {
        for (const { id } of roles) {
          const okRoles = await Role.findByPk(id);
          const RolePermission = await okRoles.getPermissions();

          roleList.push({
            id: okRoles.id,
            name: okRoles.name,
            permissions: RolePermission.map(({ value }) => value),
          });
        }
      }
      const accessToken = createAccessToken({ user_id });
      //Trả về response
      if (!accessToken) {
        return errorResponse(res, 500, "Server Error");
      }

      return successResponse(res, 200, "Success", {
        accessToken,
        refreshToken,
        roleList,
      });
    } catch {}
  },
  register: async (req, res) => {
    
      try {
        const schema = Yup.object().shape({
          first_name: Yup.string()
            .required("Xin vui lòng nhập họ của bạn")
            .max(20, "Tên chỉ chứa tối đa 20 kí tự"),
          last_name: Yup.string()
            .required("Xin vui lòng nhập tên của bạn")
            .max(20, "Tên chỉ chứa tối đa 20 kí tự"),
          username: Yup.string()
            .required("Xin vui lòng nhập tên tài khoản")
            .max(100, "Tên tài khoản chỉ chứa tối đa 100 kí tự")
            .test(
              "check-username-unique",
              "Tên tài khoản này đã được sử dụng",
              async (username) => {
                const result = await Administrator.findOne({ where: { username } });
                return !result;
              }
            ),
          email: Yup.string()
            .required("Xin vui lòng nhập email")
            .email("Xin vui lòng nhập đúng định dạng email")
            .max(100, "Email chỉ chứa tối đa 100 kí tự")
            .test(
              "check-email-unique",
              "Email này đã được sử dụng",
              async (email) => {
                const result = await Administrator.findOne({ where: { email } });
                return !result;
              }
            ),
          password: Yup.string()
            .required("Xin vui lòng nhập mật khẩu")
            .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự"),
          passwordVerify: Yup.string()
            .required("Xin vui lòng nhập lại mật khẩu")
            .max(100, "Mật khẩu chỉ chứa tối đa 100 kí tự")
            .oneOf([Yup.ref('password'), null], "Mật khẩu nhập lại không khớp")
        });
  
        const body = await schema.validate(req.body, { abortEarly: false });
  
        if (body) {
          const hashedPassword = bcrypt.hashSync(body.password, 10);
  
          await Administrator.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            username: body.username,
            password: hashedPassword,
          });
  
          return res.json({
            message: "Đăng ký thành công"
          });
        }
      } catch (err) {
        return res.status(400).json({
          message: "Đăng ký không thành công",
          errors: err.errors,
        });
      }
    
  },
};
