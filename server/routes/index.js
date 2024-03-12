const express = require("express");
const authMiddleware = require("../middlewares/index.js");
const { login, dashboard } = require("../controllers/index.js");

const router = express.Router();

router.route("/login").post(login);
router.route("/dashboard").get(authMiddleware, dashboard);

module.exports = router;
