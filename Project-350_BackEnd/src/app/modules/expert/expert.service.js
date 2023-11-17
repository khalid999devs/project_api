const config = require("../../../config");
const pool = require("../../../pool");
const ApiError = require("../../../errors/ApiError");
var jwt = require("jsonwebtoken");
const userRoleEnum = require("../../../shared/enums");

const createExpertInDB = async (payload) => {
  const { FullName, BMDC_reg, Specialization, Email, PhoneNumber, Password } =
    payload;

  const query =
    "INSERT INTO Doctors (FullName, BMDC_reg, Specialization, Email, PhoneNumber, Password) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    FullName,
    BMDC_reg,
    Specialization,
    Email,
    PhoneNumber,
    Password,
  ];

  const selectQuery =
    "SELECT FullName, BMDC_reg, Specialization, Email, PhoneNumber, Password FROM Doctors";

  await pool.promise().query(query, values);

  const [createdExpert] = (await pool.promise().query(selectQuery))[0];

  return createdExpert;
};

const loginExpert = async (payload) => {
  const { Email, Password } = payload;
  const query = "SELECT * FROM Doctors WHERE Email = ?";
  const values = [Email];

  const [expert] = (await pool.promise().query(query, values))[0];

  if (expert) {
    if (expert.Password === Password) {
      const { BMDC_reg, Email } = expert;

      const accessToken = jwt.sign(
        {
          BMDC_reg,
          Email,
          role: userRoleEnum.Doctor,
        },
        config.jwt.secret,
        { expiresIn: config.jwt.expires_in }
      );

      return {
        accessToken,
      };
    } else {
      throw new ApiError(401, "Invalid password");
    }
  } else {
    throw new ApiError(404, "Expert does not exist");
  }
};

const expertService = {
  createExpertInDB,
  loginExpert,
};

module.exports = expertService;
