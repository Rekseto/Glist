module.exports = function(router, { logger }) {
  router.get("/", (ctx, next) => {
    ctx.body = {
      success: true
    };
  });
};
