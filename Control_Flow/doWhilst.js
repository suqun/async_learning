var async = require('async');

var count = 0;

/**
* doWhilst交换了fn,test的参数位置，先执行一次循环，再做test判断。 和javascript中do..while语法一致。
*/
//doWhilst(fn, test, callback)
async.doWhilst(
	function(callback) { 
		count++;
		console.log(count);
		setTimeout(callback, 1000);
	},
	function() {
		return count < 5;
	},
	function(err) {
		// 5 seconds have passed
		console.log(count);
	}
);