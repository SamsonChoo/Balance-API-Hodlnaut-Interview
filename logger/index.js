import winston from "winston";
import "winston-daily-rotate-file";

const myFormat = winston.format.printf(
  ({ level, message, timestamp }) => `${timestamp}\t ${level}: ${message}`
);

const dailyRotateFileTransport = new winston.transports.DailyRotateFile({
  filename: `logs/%DATE%.log`,
  datePattern: "YYYY-MM-DD",
  level: "debug",
  maxFiles: "14d",
});

const logger = winston.createLogger({
  level: "info",
  transports: [new winston.transports.Console(), dailyRotateFileTransport],
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    myFormat
  ),
});

logger.exceptions.handle(dailyRotateFileTransport);

export default logger;
