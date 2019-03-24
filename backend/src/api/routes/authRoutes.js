const authServices = require("../services/authServices");
const { generateErrorResponse } = require("../../helpers/errorUtils");
const isAuthorized = require("../middlewares/isAuthorized");
module.exports = function(router, { logger, database }) {
  const authService = authServices({ database, logger });
  router.post("/auth/register", async (ctx, next) => {
    try {
      const { username, password } = ctx.request.body;
      const data = await authService.create({
        username,
        password
      });

      ctx.body = {
        success: true,
        data
      };
    } catch (error) {
      const response = generateErrorResponse(error);
      ctx.status = response.httpStatus;
      ctx.body = response;
    }
  });

  router.post("/auth/login", async (ctx, next) => {
    try {
      const { username, password } = ctx.request.body;
      const data = await authService.login({
        username,
        password
      });

      ctx.body = {
        success: true,
        data
      };
    } catch (error) {
      const response = generateErrorResponse(error);
      ctx.status = response.httpStatus;
      ctx.body = response;
    }
  });
  router.get(
    "/auth/logout",
    isAuthorized({ database, logger }),
    async (ctx, next) => {
      try {
        await authService.logout({ username: ctx.state.user.username });
        ctx.status = 200;
        ctx.body = {
          success: true
        };
      } catch (error) {
        const response = generateErrorResponse(error);
        ctx.status = response.httpStatus;
        ctx.body = response;
      }
    }
  );

  router.get(
    "/auth/verify",
    isAuthorized({ database, logger }),
    async (ctx, next) => {
      ctx.body = {
        success: true
      };
    }
  );
};
