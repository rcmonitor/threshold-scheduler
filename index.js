/**
 * //@by_rcmonitor@//
 * on 07.08.2015.
 */

var Scheduler = require('./lib/scheduler');

////	usage example:
//var hpg = require('helpers-global');
//var FileLogger = hpg.FileLogger;
//var Parameter = hpg.ParameterObject;
//
//var path = require('path');
//
//var strLogFilePath = path.join(__dirname, 'test', 'log', 'test.log');
//
//var oFileLogger = new FileLogger(strLogFilePath);
//console.log(oFileLogger.error);
//
//
//var testConsole = function(){
//	console.log('run in some seconds');
//};
//
//
//var oParameter = new Parameter();
//oParameter.time = 1;
//oParameter.threshold = 5;
//oParameter.fileLogger = oFileLogger;
//oParameter.callback = testConsole;
//
//var oScheduler = new Scheduler(oParameter);
//
//var arErrors = oScheduler.errors;
//console.log(arErrors);
//
//oScheduler.run();


module.exports = Scheduler;
