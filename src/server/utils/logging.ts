import winston from "winston";
import { IS_LOCAL } from "../configs";

const levels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warn: 4,
  notice: 5,
  info: 6,
  debug: 7,
};

const format = winston.format.combine(
  ...(!IS_LOCAL ? [] : [winston.format.errors({ stack: true })]),
  winston.format.timestamp(),
  winston.format.metadata({
    fillExcept: ["message", "level", "timestamp", "label", "stack"],
  }),

  ...(!IS_LOCAL
    ? [winston.format.uncolorize(), winston.format.json()]
    : [
        winston.format.printf(
          ({ timestamp, level, message, metadata, stack = "" }) => {
            const extraData = Object.keys(metadata as object).length
              ? JSON.stringify(metadata)
              : "";
            return [`${timestamp} [${level}]: ${message}`, extraData, stack]
              .filter(Boolean)
              .join("\n");
          }
        ),
      ])
);

const transports: winston.transport[] = [
  new winston.transports.Console({
    level: "debug",
    format: !IS_LOCAL
      ? undefined
      : winston.format.colorize({
          all: true,
          colors: {
            debug: "green",
            info: "blue",
            warning: "amber",
            error: "red",
          },
        }),
  }),
];

const Logging = winston.createLogger({
  levels,
  transports: [...transports],
  format,
});

export default Logging;
