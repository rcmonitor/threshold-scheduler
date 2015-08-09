/**
 * //@by_rcmonitor@//
 * on 07.08.2015.
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');


/**
 * will fire fCallback each intTime seconds with + intThreshold seconds accuracy
 *
 * @param {int} intTime time in seconds to repeat event
 * @param {int} intThreshold time in seconds to correct each event; <br />
 * 					will be random from 1 to intThreshold seconds
 * @param {FileLogger} [oFileLogger] object that implements log() function. <br />
 * 					if provided, log with level 'info' will be added on each event
 * @constructor
 */
function Scheduler(intTime, intThreshold, oFileLogger){

	this.time = intTime;
	this.threshold = intThreshold;
	this.filLogger = oFileLogger;
	this.secondsPassed = 0;
	this.currentSecondsOffset = 0;

	EventEmitter.call(this);
}


util.inherits(Scheduler, EventEmitter);


Scheduler.second = 1000;
Scheduler.validEvents = {callbackFired: "callback.fired"};


/**
 *
 * @param fCallback
 * @param intSeconds
 */
Scheduler.prototype.run = function(fCallback){

	//if(!intSeconds){
	//	intSeconds = 0;
	//}

	this.emit(Scheduler.validEvents.callbackFired, fCallback);

	var currentThreshold = Math.floor(Math.random() * this.threshold) + 1;
	this.currentSecondsOffset = this.time + currentThreshold;
	this.secondsPassed += this.currentSecondsOffset;

	setTimeout(this.run.bind(this), this.currentSecondsOffset * Scheduler.second, fCallback);
};


Scheduler.prototype.on(Scheduler.validEvents.callbackFired, function(fCallback){

	if(this.filLogger){
		this.filLogger.log('firing after ' + this.currentSecondsOffset + ' seconds', FileLogger.levels.info);
		this.filLogger.log('total seconds passed: ' + this.secondsPassed, FileLogger.levels.info);
	}

	fCallback();
});


module.exports = Scheduler;
