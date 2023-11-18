const express = require('express');
const SlotsController = require('./ Slots.controller');
const verifyAuthToken = require('../../middlewares/verifyAuthToken');
const userRoleEnum = require('../../../shared/enums');

const router = express.Router();

router.post(
  '/',
  verifyAuthToken(userRoleEnum.Doctor),
  SlotsController.createSlots
);
router.get(
  '/',
  verifyAuthToken(userRoleEnum.Doctor, userRoleEnum.Patient),
  SlotsController.getAllSlots
);

router.get('/prescription/:id', SlotsController.getAllPrescriptions);

router.put(
  '/:id',
  verifyAuthToken(userRoleEnum.Doctor),
  SlotsController.deleteSlot
);

router.post(
  '/prescription',
  verifyAuthToken(userRoleEnum.Doctor),
  SlotsController.prescribe
);

const SlotsRoutes = router;
module.exports = SlotsRoutes;
