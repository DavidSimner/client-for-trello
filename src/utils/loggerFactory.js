var Logger = require('utils/Logger');


function LoggerFactory() {
}

LoggerFactory.prototype.create = function (filename) {
    return new Logger(filename);
};


module.exports = new LoggerFactory();