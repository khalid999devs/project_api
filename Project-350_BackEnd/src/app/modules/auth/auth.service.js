const config = require("../../../config");
const pool = require("../../../pool");
const ApiError = require("../../../errors/ApiError");
var jwt = require("jsonwebtoken");

const userRoleEnum = require("../../../shared/enums");

const createUserInDB = async (payload) => {
  const { FirstName, LastName, Email, PhoneNumber, DateOfBirth, Password } =
    payload;

  const query =
    "INSERT INTO patients ( FirstName, LastName, Email, PhoneNumber, DateOfBirth, Password) VALUES ( ?, ?,?, ?,?, ?)";
  const values = [
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    DateOfBirth,
    Password,
  ];

  const [createdUser] = await pool.promise().query(query, values);

  const selectQuery = "SELECT * FROM patients WHERE UserID = ?";

  const selectValues = [createdUser?.insertId];

  const [user] = (await pool.promise().query(selectQuery, selectValues))[0];

  return user;
};

const loginUser = async (payload) => {
  const { Email, Password } = payload;
  const query = "SELECT * FROM patients WHERE Email = ?";
  const values = [Email];

  const [user] = (await pool.promise().query(query, values))[0];

  if (user) {
    if (user.Password === Password) {
      const { UserID, Email } = user;

      const accessToken = jwt.sign(
        {
          UserID,
          Email,
          role: userRoleEnum.Patient,
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
    throw new ApiError(404, "User does not exist");
  }
};

const authService = {
  createUserInDB,
  loginUser,
};

module.exports = authService;
