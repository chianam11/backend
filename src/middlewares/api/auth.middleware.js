//file auth.middleware.js

const { verifyToken } = require("../../utils/jwt");
const { errorResponse } = require("../../helpers/response");
const { Administrator, Blacklist } = require("../../models/index");
const nonSecurePath = [
  "/api/v1/admin/auth/login",
  "/api/v1/admin/auth/refresh",
  "/api/v1/admin/auth/register",
  
];
module.exports = async (req, res, next) => {
  try {
    if (nonSecurePath.includes(req.path)) {
      return next();
    }

    const accessToken = req.get("Authorization")?.split(" ").slice(-1).join();
    if (!accessToken) {
      return errorResponse(res, 401, "token is not null");
    }

    const blacklist = await Blacklist.findOne({
      where: { token: accessToken ?? "" },
    });
    if (blacklist) {
      return errorResponse(res, 401, "Unauthorize");
    }
    const decoded = verifyToken(accessToken);
    if (!decoded) {
      return errorResponse(res, 401, "Unauthorize");
    }
    req.user = decoded;
    const user_id = decoded.user_id;
    const exp = decoded.exp;
    const user = await Administrator.findOne({
      where: { id: user_id },
    });
    if (!user) {
      return errorResponse(res, 401, "Unauthorize");
    }

    // Thời gian hiện tại (dưới dạng timestamp Unix)
    const currentTime = Math.floor(Date.now() / 1000);

    // So sánh thời gian hiện tại với thời gian hết hạn
    if (currentTime < exp) {
      req.user = {
        accessToken,
        exp,
        ...user.dataValues,
      };
      return next();
    } else {
      return errorResponse(res, 401, "Unauthorize");
    }
  } catch {
    return res.status(500).json({ message: "Server Error" });
  }
};
