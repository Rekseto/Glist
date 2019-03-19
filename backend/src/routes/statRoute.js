module.exports = function(router, { logger, statistics }) {
  router.post("/", (ctx, next) => {
    statistics.saveStat(JSON.stringify(ctx.request.body));
    ctx.body = {
      success: true
    };
  });
};
