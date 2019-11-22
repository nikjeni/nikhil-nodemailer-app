const express = require('express');
const router = express.Router();
const usercontroller = require('../controller/user.controller');

router.post('/saveUser', usercontroller.saveUser);
router.get('/sendMail', usercontroller.sendMail);

module.exports.userRouter = router;

