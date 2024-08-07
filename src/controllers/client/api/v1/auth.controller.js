const { errorResponse, successResponse } = require("../../../helpers/response");
const { User, Blacklist, UserToken } = require("../../../models/index");
const bcrypt = require("bcrypt");
const users = require("../../../repositories/user.repository");
const {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} = require("../../../utils/jwt");
module.exports = {
  login: async (req, res) => {
    //1. Validate
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(
        res,
        400,
        "Bad Request",
        "Vui lòng nhập email và mật khẩu"
      );
    }
    //2. Kiểm tra email tồn tại
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return errorResponse(res, 400, "Bad Request", {
        email: "Email không tồn tại",
      });
    }
    //3. Lấy password hash
    const { password: hash } = user;
    //4. So sánh password hash với password từ request
    if (!bcrypt.compareSync(password, hash)) {
      return errorResponse(res, 400, "Bad Request", {
        password: "Mật khẩu không chính xác",
      });
    }
    //5. Tạo token bằng JWT
    const accessToken = createAccessToken({ user_id: user.id });
    const refreshToken = createRefreshToken();
    //Thêm refreshToken vào database
    await UserToken.create({
      refresh_token: refreshToken,
      user_id: user.id,
    });
    //6. Trả về Response
    if (!accessToken) {
      return errorResponse(res, 500, "Server Error");
    }
    return successResponse(res, 200, "Success", {
      accessToken,
      refreshToken,
    });
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
    //Input: Refresh Token (Body)
    const refreshToken = req.body.refresh_token;
    const userToken = await UserToken.findOne({
      where: { refresh_token: refreshToken },
    });
    if (!userToken) {
      return errorResponse(res, 400, "Bad Request");
    }
    //Nếu tồn tại trong Database --> Lấy user_id
    const { user_id } = userToken;

    //Verify Token --> Kiểm tra hết hạn
    const decoded = verifyToken(refreshToken);
    if (!decoded) {
      return errorResponse(res, 401, "Unathorize");
    }
    //Khởi tạo accessToken mới
    const accessToken = createAccessToken({ user_id });

    //Trả về response
    if (!accessToken) {
      return errorResponse(res, 500, "Server Error");
    }
    return successResponse(res, 200, "Success", {
      accessToken,
      refreshToken,
    });
  },
  signup: async (req, res) => {
    res.json({});
  },
};
