const express = require('express');
const authController = require('./auth.controller');
const userRoleEnum = require('../../../shared/enums');
const verifyAuthToken = require('../../middlewares/verifyAuthToken');

const router = express.Router();

router.post('/signup', authController.createUser);
router.get(
  '/getPatient',
  verifyAuthToken(userRoleEnum.Patient),
  authController.getPatient
);
router.post('/login', authController.loginUser);
router.get(
  '/logout',
  verifyAuthToken(userRoleEnum.Patient),
  authController.logout
);

const authRoutes = router;
module.exports = authRoutes;
