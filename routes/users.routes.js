const express = require("express");
const {
  getUser,
  updateUser,
  getUserProfile,
  getAllUsers,
  deleteUser,
} = require("../controller/users.controller");
const router = express.Router();

router.get("/get-user", getUser);
router.put("/update-user", updateUser);
router.patch("/update-user", updateUser);
router.get("/get-users-profile", getUserProfile);
router.get("/get-all-user", getAllUsers);
router.delete("/delete-user", deleteUser);

module.exports = router;
