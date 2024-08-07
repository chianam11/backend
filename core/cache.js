// const connectRedis = require("../utils/redis");
// module.exports = class {
//   static async remember(key, seconds, callback) {
//     if (typeof callback !== "function") {
//       throw new Error("Callback phải là 1 hàm");
//     }
//     const redis = await connectRedis();
//     let result = await redis.get(key);
//     if (!result) {
//       result = await callback(); //Đọc từ database
//       await redis.set(key, JSON.stringify(result), "EX", seconds);
//       return result;
//     }

//     return JSON.parse(result);
//   }
// };
