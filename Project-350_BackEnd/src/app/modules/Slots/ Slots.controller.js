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

const SlotsController = {
  createSlots,
  deleteSlot,
  getAllSlots,
};

module.exports = SlotsController;
