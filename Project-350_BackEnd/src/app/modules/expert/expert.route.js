const express = require('express');
const expertController = require('./expert.controller');
const authController = require('../auth/auth.controller');

const verifyAuthToken = require('../../middlewares/verifyAuthToken');
const userRoleEnum = require('../../../shared/enums');

const router = express.Router();

router.post('/signup', expertController.createExpert);
router.get(
  '/getExpert',
  verifyAuthToken(userRoleEnum.Doctor),
  expertController.getExpert
);
router.post('/login', expertController.loginExpert);
router.get(
  '/logout',
  verifyAuthToken(userRoleEnum.Doctor),
  authController.logout
);

const expertRoutes = router;
module.exports = expertRoutes;
