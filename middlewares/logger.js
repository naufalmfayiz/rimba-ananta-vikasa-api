const winston = require("winston");

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: "requests.log" })],
});

const logMiddleware = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

module.exports = logMiddleware;
