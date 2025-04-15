const express = require('express');
const router = express.Router();
const {signInController,signUpController} = require('../controllers/authController');

router.post("/signup",signUpController);
router.post("/signin",signInController);

module.exports = router;