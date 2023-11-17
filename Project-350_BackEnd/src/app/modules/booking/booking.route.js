const express = require('express');
const bookingController = require('./booking.controller');
const verifyAuthToken = require('../../middlewares/verifyAuthToken');
const userRoleEnum = require('../../../shared/enums');

const router = express.Router();

router.post(
  '/',
  verifyAuthToken(userRoleEnum.Patient),
  bookingController.createBooking
);

router.get(
  '/',
  verifyAuthToken(userRoleEnum.Patient, userRoleEnum.Doctor),
  bookingController.getAllBookings
);

router.get(
  '/docAppointmentsView',
  verifyAuthToken(userRoleEnum.Doctor),
  bookingController.getAllBookings
);

router.patch(
  '/:id',
  verifyAuthToken(userRoleEnum.Doctor),
  bookingController.updateBooking
);

const bookingRoutes = router;
module.exports = bookingRoutes;
