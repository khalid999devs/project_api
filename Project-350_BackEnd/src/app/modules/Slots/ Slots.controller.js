const pool = require('../../../pool');
const catchAsync = require('../../../shared/catchAsync');
const sendResponse = require('../../../shared/sendResponse');
const { use } = require('./Slots.route');
const authService = require('./Slots.service');

const createSlots = catchAsync(async (req, res) => {
  const slotsData = req.body;
  const user = req.verifiedUser;

  const result = await authService.createSlotsInDB(slotsData, user?.BMDC_reg);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Slot created successfully',
    data: result,
  });
});

const getAllSlots = catchAsync(async (req, res) => {
  const user = req.verifiedUser;

  const result = await authService.getAllSlotsFromDB(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `${
      result.length < 1 ? 'No slots found.' : 'Slots retrieved successfully.'
    }`,
    data: result,
  });
});

const deleteSlot = catchAsync(async (req, res) => {
  const id = req.params.id;
  const metaData = await authService.deleteSlotServ(id);
  console.log(metaData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `deleted`,
  });
});

const prescribe = catchAsync(async (req, res) => {
  const presData = req.body;

  const result = authService.prescription(presData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `successfully added the prescription`,
    result: result,
  });
});

const getAllPrescriptions = catchAsync(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const selectQuery = 'SELECT * FROM prescription WHERE PatientID = ?';

  const selectValues = [id];

  const [prescribes] = await pool.promise().query(selectQuery, selectValues);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: `successfull`,
    data: prescribes,
  });
});

const SlotsController = {
  createSlots,
  deleteSlot,
  getAllSlots,
  prescribe,
  getAllPrescriptions,
};

module.exports = SlotsController;
