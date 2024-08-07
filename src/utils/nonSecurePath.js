//file nonSecurePath.js

module.exports = (path) => {
  const nonSecurePath = ["/login"];
  if (nonSecurePath.includes(path)) return true;
  else return false;
};
