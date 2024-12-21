const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");

router.post('/register', register);
router.post('/login', login);
router.get('/', validateToken, getUser);
module.exports = router;