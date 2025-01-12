const winston = require("winston");
const path = require("path");
const fs = require("fs");

const logsDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
};

const logFilename = path.join(logsDir, `${getCurrentDate()}-requests.log`);

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.printf(({ level, message }) => {
      return `${message}`;
    })
  ),
  transports: [new winston.transports.File({ filename: logFilename })],
});

const logMiddleware = (req, res, next) => {
  const now = new Date();
  const time = now.toTimeString().split(" ")[0];

  logger.info(`[${time}] ${req.method} ${req.url}`);
  next();
};

module.exports = logMiddleware;
