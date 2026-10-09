const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorize = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // Support Bearer token from Authorization header
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
        token = parts[1];
      } else {
        token = req.headers.authorization;
      }
    }

    if (!token && req.query?.token) {
      token = req.query.token;
    }

    if (!token || token === "null" || token === "undefined") {
      return res
        .status(401)
        .json({ message: "Unauthorised | Token not Found!" });
    }

    const secretKey = process.env.SECRET_KEY || "defaultsecret";
    const verify = jwt.verify(token, secretKey);

    if (verify && (verify.userId || verify._id)) {
      req.userId = verify.userId || verify._id;
      return next();
    } else {
      return res.status(403).json({ message: "Forbidden!" });
    }
  } catch (error) {
    console.error("Authorize error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token!" });
  }
};

module.exports = authorize;