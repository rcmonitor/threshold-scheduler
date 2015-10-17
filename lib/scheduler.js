/**
 * //@by_rcmonitor@//
 * on 07.08.2015.
 */

//	keeping EventEmitter property for backward compatibility with >=0.10
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var hpg = require('helpers-global');
var FileLogger = hpg.FileLogger;


/**
 * listener that should be executed on fire event end run the callback
 */
var fireListener = function(){

	if(this.fileLogger){

		this.fileLogger.log('firing after ' + this.currentSecondsOffset + ' seconds', FileLogger.levels.info);
		this.fileLogger.log('total seconds passed: ' + this.secondsPassed, FileLogger.levels.info);
	}

	this.callback.apply(this.contextObject, this.arguments);
};


/**
 * will fire fCallback each intTime seconds with + intThreshold seconds accuracy
 *
 * @param {object} oParameterObject interface object that contains all required data: <br />
 * <ul>
 *     <li>time {int} time in seconds, interval to fire callback </li>
 *     <li>threshold {int} time in seconds, to randomly adjust callback firing between 1 and threshold seconds </li>
 *     <li>[fileLogger] {FileLogger} logger instance, if given, every fire will be logged with level 'info' </li>
 *     <li>callback {function | string} callback function or name of property of contextObject that contains callback </li>
 *     <li>[contextObject] {object} object that will be set as this for callback </li>
 *     <li>[arguments] {array} an array of arguments to pass to callback </li>
 * </ul>
 *
 * @constructor
 */
function Scheduler(oParameterObject){

	this.errors = [];

	this.time = oParameterObject.time;
	this.threshold = oParameterObject.threshold;
	this.fileLogger = oParameterObject.fileLogger;
	this.contextObject = oParameterObject.contextObject;
	this.arguments = oParameterObject.arguments;

	this.setCallback(oParameterObject.callback);

	this.secondsPassed = 0;
	this.currentSecondsOffset = 0;

	EventEmitter.call(this);

	this.on(Scheduler.validEvents.callbackFired, fireListener.bind(this));
}


util.inherits(Scheduler, EventEmitter);


Scheduler.second = 1000;
Scheduler.validEvents = {callbackFired: "callback.fired"};


/**
 * actually starts the job execution
 */
Scheduler.prototype.run = function(){

	this.emit(Scheduler.validEvents.callbackFired);

	var currentThreshold = Math.floor(Math.random() * this.threshold) + 1;
	this.currentSecondsOffset = this.time + currentThreshold;
	this.secondsPassed += this.currentSecondsOffset;

	setTimeout(this.run.bind(this), this.currentSecondsOffset * Scheduler.second);
};

//Scheduler.prototype.on(Scheduler.validEvents.callbackFired, function(){
//
//	if(this.fileLogger){
//
//		this.fileLogger.log('firing after ' + this.currentSecondsOffset + ' seconds', FileLogger.levels.info);
//		this.fileLogger.log('total seconds passed: ' + this.secondsPassed, FileLogger.levels.info);
//	}
//
//	this.callback.apply(this.contextObject, this.arguments);
//});


Scheduler.prototype.setCallback = function(callback){

	var strCallbackType = hpg.getType(callback);

	if(strCallbackType == 'function'){
		this.callback = callback;
	}else if(strCallbackType == 'string'){
		if(this.contextObject){
			this.callback =	this.contextObject[callback];
		}else{
			this.errors.push('context object must be defined if callback is string');
		}
	}else{
		this.errors.push('callback type "' + strCallbackType + '" is unknown');
	}
};

module.exports = Scheduler;
