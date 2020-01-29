const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const secret = process.env.JWT_SECRET || "it is secret, is it safe?";

    jwt.verify(authorization, secret, function(err, decodedToken) {
      if (err) {
        res.status(401).json({ message: "invalid Token" });
      } else {
        req.user = { department: decodedToken.department };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please Login and try again" });
  }
};

// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (authorization) {
//     const secret = process.env.JWT_SECRET || "it is secret, is it safe?";

//     jwt.verify(authorization, secret, function(err, decodedToken) {
//       if (err) {
//         res.status(401).json({ message: "invalid Token" });
//       } else {
//         req.token = decodedToken;
//         next();
//       }
//     });
//   } else {
//     res.status(400).json({ message: "Please Login and try again" });
//   }
// };
