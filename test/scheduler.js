/**
 * //@by_rcmonitor@//
 * on 07.08.2015.
 */

require('chai').should();

var Scheduler = require('../index');


describe('scheduler tests', function(){

	describe('#run() function', function(){

		var oScheduler = new Scheduler(10, 8);

		it('should execute callback', function(done){

			oScheduler.run(function(){

				done();
			});
		})
	})
});