const pool = require('../../../pool');
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
  res.json({
    statusCode: 200,
    success: true,
    message: 'Login successful',
  });
});

const getExpert = catchAsync(async (req, res) => {
  const user = req.verifiedUser;

  const query =
    'SELECT FullName,Specialization,PhoneNumber,BMDC_reg FROM Doctors WHERE Email = ?';
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

const expertController = {
  createExpert,
  loginExpert,
  getExpert,
};

module.exports = expertController;
