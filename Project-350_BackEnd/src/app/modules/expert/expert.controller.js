const catchAsync = require('../../../shared/catchAsync');
const sendResponse = require('../../../shared/sendResponse');
const { attachTokenToResponse } = require('../../../utils/attachToken');
const expertService = require('./expert.service');

const createExpert = catchAsync(async (req, res) => {
  const expert = req.body;

  const result = await expertService.createExpertInDB(expert);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Expert created successfully',
    data: result,
  });
});

const loginExpert = catchAsync(async (req, res) => {
  const loginDAta = req.body;

  const result = await expertService.loginExpert(loginDAta);
  const token = result.accessToken;
  attachTokenToResponse('token', { res, token, expiresInDay: 365 });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
  });
});

const getExpert = catchAsync(async (req, res) => {
  const user = req.verifiedUser;
  console.log(req.verifiedUser);
  if (user.role === 'Doctor')
    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: user,
    });
  else
    sendResponse(res, {
      statusCode: 401,
      success: false,
      msg: 'Please login to your account as an Expert',
    });
});

const expertController = {
  createExpert,
  loginExpert,
  getExpert,
};

module.exports = expertController;
