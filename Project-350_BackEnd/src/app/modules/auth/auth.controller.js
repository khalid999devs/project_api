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
  const query = 'SELECT DateOfBirth,PhoneNumber FROM Patients WHERE Email = ?';
  const values = [user.Email];

  const [expert] = (await pool.promise().query(query, values))[0];

  if (expert)
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'success',
      data: { ...user, ...expert },
    });
  else
    sendResponse(res, {
      statusCode: 401,
      success: false,
      message: 'Wrong credentials. Please login to your account',
    });
});

const authController = {
  createUser,
  loginUser,
  getPatient,
};

module.exports = authController;
