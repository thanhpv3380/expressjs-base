const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: { type: 'console' },
    file: {
      type: 'file',
      filename: 'logs/app.log',
      maxLogSize: 5242880, // 5MB
      compress: true,
      keepFileExt: true,
    },
  },
  categories: {
    default: { appenders: ['console', 'file'], level: 'info' },
  },
});

const logger = log4js.getLogger();

const loggerCustom = {
  info: (message, requestId) => {
    const modifiedMessage = requestId ? `[${requestId}] ${message}` : message;
    logger.info(modifiedMessage);
  },
  warning: (message, requestId) => {
    const modifiedMessage = requestId ? `[${requestId}] ${message}` : message;
    logger.warn(modifiedMessage);
  },
  error: (message, requestId) => {
    const modifiedMessage = requestId ? `[${requestId}] ${message}` : message;
    logger.error(modifiedMessage);
  },
};

module.exports = loggerCustom;
