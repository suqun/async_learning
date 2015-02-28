var async = require('async');

var count = 0;

/**
* doUntil与doWhilst正好相反，当test为false时循环，与true时跳出。其它特性一致。
*/
//whilst(test, fn, callback)
async.doUntil(
	function(callback) {
		count++;
		console.log(count);
		setTimeout(callback, 1000);
	},
	function() {
		return count > 1;
	},
	function(err) {
		// 5 seconds have passed
		console.log(count);
	}
);