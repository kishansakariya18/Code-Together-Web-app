const express = require("express");
const router = express();
import { register, login } from "src/controllers/auth";

router.post("/register", register);
router.post("/login", login);

module.exports = router;
