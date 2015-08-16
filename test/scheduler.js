/**
 * //@by_rcmonitor@//
 * on 07.08.2015.
 */

require('chai').should();
var ParameterObject = require('helpers-global').ParameterObject;

var Scheduler = require('../index');


describe('scheduler tests', function(){

	describe('#run() function', function(){


		it('should execute callback', function(done){

			var oParameter = new ParameterObject();
			oParameter.time = 10;
			oParameter.threshold = 8;
			oParameter.callback = done;

			var oScheduler = new Scheduler(oParameter);

			var arErrors = oScheduler.errors;
			arErrors.should.be.an('array');
			arErrors.should.be.empty;

			oScheduler.run();
		})
	})
});