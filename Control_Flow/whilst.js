var async = require('async');

var count = 0;
//whilst(test, fn, callback)
/*
*相当于while，但其中的异步调用将在完成后才会进行下一次循环。
*/
async.whilst(
	function() {
		return count < 5;
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