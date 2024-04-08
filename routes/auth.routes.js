const express = require("express");
const {
  signUp,
  login,
  reSendVerificationMail,
  verifyAccount,
  deleteUser,
} = require("../controller/auth.controller");
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/login", login);
router.post("/resend-verification", reSendVerificationMail);
router.get("/verify-account", verifyAccount);
router.get("/delete-user", deleteUser);

module.exports = router;
