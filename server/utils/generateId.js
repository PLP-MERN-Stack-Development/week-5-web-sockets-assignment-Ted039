// utils/generateId.js
module.exports = function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000);
};
