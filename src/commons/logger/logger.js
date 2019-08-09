'use strict';

const winston = require('winston');

const logLevel = process.env.LOG_LEVEL || 'debug';
const logEnabled = process.env.LOG_ENABLED || 'true';
const logger = new (winston.Logger)();

if (logEnabled === 'true') {
  logger.add(winston.transports.Console, {
    prettyPrint: true,
    level: logLevel
  });
}

module.exports = logger;
