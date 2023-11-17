const catchAsync = require('../../../shared/catchAsync');
const sendResponse = require('../../../shared/sendResponse');
const authService = require('./auth.service');

const createUser = catchAsync(async (req, res) => {
  const user = req.body;

  const result = await authService.createUserInDB(user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const loginDAta = req.body;
  const result = await authService.loginUser(loginDAta);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

const getPatient = catchAsync(async (req, res) => {
  const user = req.verifiedUser;
  console.log(req.verifiedUser);
  if (user.role === 'Patient')
    sendResponse(res, {
      statusCode: 200,
      success: true,
      data: user,
    });
  else
    sendResponse(res, {
      statusCode: 401,
      success: false,
      msg: 'Please login to your account as a  patient',
    });
});

const authController = {
  createUser,
  loginUser,
  getPatient,
};

module.exports = authController;
