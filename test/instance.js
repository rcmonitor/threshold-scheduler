/**
 * //@by_rcmonitor@//
 * on 12.08.2015.
 */

require('chai').should();
var Parameter = require('helpers-global').ParameterObject;

var Scheduler = require('../index');


function SomeClass(intParam, fCallback){
	this.param = intParam;
	//this.testFunction.bind(this);

	this.should.be.instanceof(SomeClass);

	if(fCallback){
		fCallback();
	}
}

SomeClass.prototype.testFunction = function(){


	this.should.be.instanceof(SomeClass);


	return this.param;
};


describe('scheduler test', function(){


	describe('#run() function', function(){

		it('should be instance of a correct class', function(done){
			var oSome = new SomeClass(42, done);

			var oParameter = new Parameter();
			oParameter.time = 10;
			oParameter.threshold = 5;
			oParameter.callback = oSome.testFunction;
			oParameter.contextObject = oSome;

			var oScheduler = new Scheduler(oParameter);

			var arErrors = oScheduler.errors;
			arErrors.should.be.an('array');
			arErrors.should.be.empty;

		});

		it('should evaluate function of a correct class', function(){

			var oSome = new SomeClass(56);

			var oParameter = new Parameter();
			oParameter.time = 10;
			oParameter.threshold = 5;
			oParameter.callback = oSome.testFunction;
			oParameter.contextObject = oSome;

			oSome.should.be.an('object');
			oSome.should.be.instanceof(SomeClass);

			var oScheduler = new Scheduler(oParameter);

			var arErrors = oScheduler.errors;
			arErrors.should.be.an('array');
			arErrors.should.be.empty;

			oScheduler.run();
		});
	});

});