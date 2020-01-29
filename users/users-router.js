const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, onlyDepartment("sales"), (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});
function onlyDepartment(department) {
  return function(req, res, next) {
    if (
      req.user &&
      req.user.department &&
      req.user.department.toLowerCase() === department
    ) {
      next();
    } else {
      res.status(403).json({
        message: `you have no power here, you must be  in ${department}`
      });
    }
  };
}

//old code
// function checkRole(role) {
//   return function(req, res, next) {
//     if (req.token && role === req.token.role) {
//       next();
//     } else {
//       res
//         .status(403)
//         .json({ message: `you have no power here, you must be a ${role}` });
//     }
//   };
// }

module.exports = router;
