function Logger(filename) {
    this.filename = filename;
}

Logger.prototype.log = function (message, data) {
    console.log(this.filename + ' ' + message + (data !== undefined ? ' =' + JSON.stringify(data) : ''));
};


module.exports = Logger;