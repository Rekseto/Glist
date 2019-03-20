const metricsServices = require("../services/metricsServices");

module.exports = function(router, { logger, database }) {
  const metricService = metricsServices({ database, logger });
  router.get("/", (ctx, next) => {
    ctx.body = {
      success: true
    };
  });

  router.post("/", (ctx, next) => {
    try {
      metricService.createMetric(ctx.request.body);
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
