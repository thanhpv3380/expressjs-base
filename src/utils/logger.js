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

module.exports = log4js;
