const winston = require('winston')
const fs = require('fs')

fs.exists('./logs', exists => exists ? null : fs.mkdir('./logs'))

module.exports = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: "error" }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: 'logs/filelog-error.log',
      level: 'error',
      json: true,
      timestamp: function () { return Date() }
    }),
    new (winston.transports.File)({
      name: 'warn-file',
      filename: 'logs/filelog-warn.log',
      level: 'warn',
      json: true,
      timestamp: function () { return Date() }
    })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)(),
    new winston.transports.File({
      filename: 'logs/exceptions.log',
      json: true,
      humanReadableUnhandledException: true,
      timestamp: function () { return Date() }
    })
  ],
  exitOnError: true
})
