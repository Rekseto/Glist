const Koa = require("koa");
const Router = require("koa-router");
const callDir = require("call-dir");
const path = require("path");
const { createLogger, format, transports } = require("winston");

const levels = {
  info: 0, // harmless actions
  notify: 1, // potential dangerous actions
  error: 2, // erros
  critical: 3 // criticals
};

const winstonLogger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console({ level: "notify" }),
    new transports.Console({ level: "error" }),
    new transports.File({
      filename: "/var/project/logs/notify.log",
      level: "notify"
    }),
    new transports.File({
      filename: "/var/project/logs/info.log",
      level: "info"
    }),
    new transports.File({
      filename: "/var/project/logs/errors.log",
      level: "error"
    })
  ],
  levels
});

async function initServer(config) {
  const logger = winstonLogger;
  const router = new Router();
  const app = new Koa();
  try {
    logger.notify(`BACKEND:${config.SERVER_ID} started`);

    const dependencies = { logger };
    const routes = path.resolve(__dirname, "./routes");
    callDir.loadAll(routes, fpath => require(fpath)(router, dependencies));

    app.use(router.routes()).use(router.allowedMethods());
    app.listen(config.PORT);
  } catch (error) {
    logger.critical(error.message);
  }
}

initServer(process.env);
