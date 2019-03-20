const Koa = require("koa");
const body = require("koa-body");
const cors = require("koa-cors");
const loggerMiddleware = require("koa-logger");
const Router = require("koa-router");
const callDir = require("call-dir");
const path = require("path");
const { createLogger, format, transports } = require("winston");

const { initDatabase, Database } = require("./Database");

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
    new transports.Console({ level: "critical" }),
    new transports.File({
      filename: "/var/glist/logs/notify.log",
      level: "notify"
    }),
    new transports.File({
      filename: "/var/glist/logs/info.log",
      level: "info"
    }),
    new transports.File({
      filename: "/var/glist/logs/errors.log",
      level: "error"
    })
  ],
  levels
});

async function initServer(config) {
  const logger = winstonLogger;

  const router = new Router();

  const app = new Koa();
  app.use(loggerMiddleware());
  app.use(body());
  app.use(cors());
  app.use(router.routes()).use(router.allowedMethods());
  const database = initDatabase({ logger }, config);
  logger.notify(`BACKEND started`);
  try {
    await database.connect();

    const dependencies = { logger, database: database };
    const routes = path.resolve(__dirname, "api/routes");
    callDir.loadAll(routes, fpath => require(fpath)(router, dependencies));

    app.listen(config.SERVER_PORT);
  } catch (error) {
    logger.critical(error.message);
  }
}

initServer(process.env);
