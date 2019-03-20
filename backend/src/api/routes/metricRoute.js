const metricsServices = require("../services/metricsServices");

module.exports = function(router, { logger, database }) {
  const metricService = metricsServices({ database, logger });
  router.post("/", async (ctx, next) => {
    try {
      const result = await metricService.fetchInRange(ctx.request.body);

      ctx.body = {
        success: true,
        data: result
      };
    } catch (error) {
      logger.error(error.message);
      ctx.body = {
        success: false
      };
    }
  });

  router.put("/", async (ctx, next) => {
    try {
      await metricService.createMetric(ctx.request.body);
      ctx.body = {
        success: true
      };
    } catch (error) {
      logger.error(error.message);
      ctx.body = {
        success: false
      };
    }
  });
};
