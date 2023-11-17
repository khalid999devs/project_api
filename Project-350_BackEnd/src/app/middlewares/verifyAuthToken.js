const config = require('../../config');
var jwt = require('jsonwebtoken');
const ApiError = require('../../errors/ApiError');

const verifyAuthToken =
  (...requiredRoles) =>
  async (req, res, next) => {
    try {
      const { token } = req.signedCookies;
      console.log(req.signedCookies.token);

      if (!token) {
        throw new ApiError(401, 'Authorization token not provided');
      }

      const authTokenData = jwt.verify(token, config.jwt.secret);

      if (!authTokenData) {
        throw new ApiError(401, 'Invalid authorization token');
      }

      if (requiredRoles.length && requiredRoles.includes(authTokenData?.role)) {
        req.verifiedUser = authTokenData;

        next();
      } else {
        throw new ApiError(403, 'Forbidden');
      }
    } catch (error) {
      next(error);
    }
  };

module.exports = verifyAuthToken;
