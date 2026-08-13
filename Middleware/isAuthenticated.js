const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../Model/UserModel");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Please login first"
      });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_KEY
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User no longer exists"
      });
    }

    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = isAuthenticated;