/**
 * //@by_rcmonitor@//
 * on 08.08.2015.
 */

var fs = require('fs');
require('chai').should();

var Scheduler = require('../index');

var hpg = require('helpers-global');
var FileLogger = hpg.FileLogger;

var strLogDirPath = __dirname + '/log';
var strLogFilePath = strLogDirPath + '/test.log';


describe('scheduler logger test', function(){

	beforeEach(function(){

		hpg.ensureDirectoryExistsSync(strLogDirPath);

		if(fs.existsSync(strLogFilePath)){
			fs.unlinkSync(strLogFilePath);
		}
	});

	describe('#run() function', function(){

		var fCallback = function(){
			console.log('some');
		};

		it('should run given callback and log to file', function(){
			var oFileLogger = new FileLogger(strLogFilePath);
			var oScheduler = new Scheduler(5, 2, oFileLogger);

			oScheduler.run(fCallback);

			var strLogFile = fs.readFileSync(strLogFilePath, 'utf8');

			strLogFile.should.be.a('string');

			strLogFile.should.contain(': info: firing after 0 seconds');
			strLogFile.should.contain(': info: total seconds passed: 0');
		})
	})
});

