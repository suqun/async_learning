var async = require('async');

var count = 0;
/**
* until与whilst正好相反，当test为false时循环，与true时跳出。其它特性一致。
*/
async.until(
	function() {
		return count > 5;
	},
	function(callback) {
		count++;
		console.log(count);
		setTimeout(callback, 1000);
	},
	function(err) {
		// 5 seconds have passed
		console.log(count);
	}
);