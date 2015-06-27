var logger = require('utils/loggerFactory').create(module.filename);
var ajax = require('ajax');
var appinfo = require('appinfo.json');
var clock = require('clock');
var Emitter = require('emitter');
var image = require('image');
var myutil = require('myutil');
var safe = require('safe');
var settings = require('settings');
var struct = require('struct');
var timeline = require('timeline');
var UI = require('ui');
var uiAccel = require('ui/accel');
var UiElement = require('ui/element');
var uiImageservice = require('ui/imageservice');
var uiPropable = require('ui/propable');
var uiResource = require('ui/resource');
var uiSimply = require('ui/simply');
var uiSimplyPebble = require('ui/simply-pebble');
var UiStage = require('ui/stage');
var uiWindowstack = require('ui/windowstack');
var util2 = require('util2');
var wakeup = require('wakeup');


function EnvironmentLogger() {
}

function logObject (name, value) {
    if (value === null) {
        logger.log(name + ' :null');
    }
    else if (value === undefined) {
        logger.log(name + ' :undefined');
    }
    else if (value === window.__loader.packages) {
        logger.log(name + ' ===window.__loader.packages');
    }
    else if (value === window.__loader.packagesLinenoOrder) {
        logger.log(name + ' ===window.__loader.packagesLinenoOrder');
    }
    else if (value === window.document) {
        logger.log(name + ' ===window.document');
    }
    else if (value === window.moment) {
        logger.log(name + ' ===window.moment');
    }
    else {
        if (value.constructor !== Object) {
            logger.log(name + ' :' + value.constructor.name, value.constructor === Function || value.constructor === Window ? undefined : value);
        }

        if (value.constructor !== String) {
            for (var prop in value) {
                logObjectInner(value, name + '.' + prop, value[prop]);
            }
        }
    }
}

function logObjectInner (oldValue, newName, newValue) {
    if (newValue === oldValue) {
        logger.log(newName + ' :Recursive');
    } else {
        logObject(newName, newValue);
    }
}

EnvironmentLogger.prototype.log = function () {
    logObject('module', module);

    logObject('ajax', ajax);
    logObject('appinfo', appinfo);
    logObject('clock', clock);
    logObject('Emitter', Emitter);
    logObject('image', image);
    logObject('myutil', myutil);
    logObject('safe', safe);
    logObject('settings', settings);
    logObject('struct', struct);
    logObject('timeline', timeline);
    logObject('UI', UI);
    logObject('uiAccel', uiAccel);
    logObject('UiElement', UiElement);
    logObject('uiImageservice', uiImageservice);
    logObject('uiPropable', uiPropable);
    logObject('uiResource', uiResource);
    logObject('uiSimply', uiSimply);
    logObject('uiSimplyPebble', uiSimplyPebble);
    logObject('UiStage', UiStage);
    logObject('uiWindowstack', uiWindowstack);
    logObject('util2', util2);
    logObject('wakeup', wakeup);
    
    logObject('window', window);
};


module.exports = EnvironmentLogger;