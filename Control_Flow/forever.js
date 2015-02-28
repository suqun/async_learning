var async = require('async');

var count = 0;
/*
 * 无条件循环执行，如果不出错，callback永远不被执行。
 */
async.forever(
	function(next) {
		// next is suitable for passing to things that need a callback(err [, whatever]);
		// it will result in this function being called again.
		setTimeout(function(){
			count++;
			console.log('count:'+count);
			next();
		}, 1000);
		
	},
	function(err) {
		// if next is called with a value in its first parameter, it will appear
		// in here as 'err', and execution will stop.
		console.log('err:'+err);
	}
);