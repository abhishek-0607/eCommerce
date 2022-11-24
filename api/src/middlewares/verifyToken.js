const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.KEY, (err, user) => {
      if (err) res.status(403).json("token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("you are not authenticated");
  }
};
const verifyAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do that!!!");
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do that");
    }
  });
};
module.exports = { verifyToken, verifyAuthorization, verifyAdmin };
