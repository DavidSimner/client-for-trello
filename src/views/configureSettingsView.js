var logger = require('utils/loggerFactory').create(module.filename);
var appinfo = require('appinfo');
var settings = require('settings');


function getAppInfo () {
    var ret = JSON.parse(JSON.stringify(appinfo));
    delete ret.resources;
    return ret;
}

function getToken () {
    var random = new Uint32Array(4);
    crypto.getRandomValues(random);
    return Object.keys(random).reduce(function (acc, i) {
        return acc + ('00000000' + random[i].toString(16)).slice(-8);
    }, '');
}

function getSettingsToken () {
    var oldValue = settings.option('settingsToken');
    if (oldValue !== undefined) {
        return oldValue;
    } else {    
        return getToken();
    }
}

var processToken = getToken();
function getProcessToken () {
    return processToken;
}

function getVariableToken () {
    return getToken();
}


settings.config({ url: 'https://www.papaya.me.uk/' },
                function (data) {
                    logger.log('Settings config open callback', data);
                    
                    var additionalSettings = {
                        appInfo: getAppInfo(),
                        pebbleVersionCode: Pebble.getVersionCode(),
                        pebbleExtensions: Pebble.getExtensions(),
                        pebbleActiveWatchInfo: Pebble.getActiveWatchInfo(),
                        pebbleActivePebbleWatchInfo: Pebble.getActivePebbleWatchInfo(),
                        pebbleAccountToken: Pebble.getAccountToken(),
                        pebbleWatchToken: Pebble.getWatchToken(),
                        settingsToken: getSettingsToken(),
                        processToken: getProcessToken(),
                        variableToken: getVariableToken()
                    };
                    Object.keys(additionalSettings).forEach(function (key) {
                        var value = additionalSettings[key];
                        logger.log(key, value);
                        settings.option(key, value);
                    });
                },
                function (data) {
                    logger.log('Settings config close callback', data);
                });
logger.log('Settings configured');