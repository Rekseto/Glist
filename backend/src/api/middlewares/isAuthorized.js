const { extractToken, decodeToken } = require("../../helpers/authUtils");
const { generateErrorResponse } = require("../../helpers/errorUtils");
const jwt = require("jsonwebtoken");
const NotAllowedError = require("../../errors/NotAllowedError");
/**
 * A simple middleware which checks if the request is authorized. Additionally,
 * populates Koa context with basic user informations for further usage. Based
 * on JSON Web Tokens.
 *
 * @example Checks if request is authorized
 *  router.use("/api/foo", isAuthorized(User, Roles);
 *  router.get("/api/foo", async (ctx) => { … });
 *
 * @param   {Object}      models
 * @param   {Mongoose}   models.User
 * @return  {Function}
 */
const isAuthorized = ({ database, logger }) => async (ctx, next) => {
  const { User } = database.models;
  try {
    const token = extractToken(ctx);
    if (!token) {
      const response = generateErrorResponse(new NotAllowedError());
      ctx.status = response.httpStatus;
      ctx.body = response;
    }

    const data = await fetchUserFromToken(User, token);

    if (!data) {
      const response = generateErrorResponse(new NotAllowedError());
      ctx.status = response.httpStatus;
      ctx.body = response;
    }

    const secret = `${data.secret}@${process.env.AUTH_SECRET}`;
    if (!secret) {
      const response = generateErrorResponse(new NotAllowedError());
      ctx.status = response.httpStatus;
      ctx.body = response;
    }
    return jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        const response = generateErrorResponse(new NotAllowedError());
        ctx.status = response.httpStatus;
        ctx.body = response;
      } else {
        // Populate context with user info from JWT session:
        ctx.state.user = data;
        ctx.state.jwt = decoded;

        return next();
      }
    });
  } catch (error) {
    logger.error(error);
    const response = generateErrorResponse(new NotAllowedError());
    ctx.status = response.httpStatus;
    ctx.body = response;
  }
};

async function fetchUserFromToken(User, token) {
  try {
    const { payload } = decodeToken(token);
    const user = await User.findOne({
      _id: payload.id
    });

    if (!user) throw new NotAllowedError();
    return user;
  } catch (error) {
    throw new NotAllowedError();
  }
}

module.exports = isAuthorized;
