var async = require('async');

var arr = ['000-00-0000', '220-11-4586', '55-555-5555', '89a-rr-jui7'];

var partten = /\d{3}-\d{2}-\d{4}/;

/**
* 用于取得集合中满足条件的第一个元素。
* 它分为并行与顺序执行两种方式，分别对应函数detect和detectSeries。
*/
//  detect(array, iterator(item,callback(test)), callback(result)
/*
async.detect(arr, function(item, callback) {
	console.log('detect: enter ' + item);
	setTimeout(function() {
		console.log('detect: process ' + item);
		callback(partten.test(item));
	}, 200);
}, function(results) {
	console.log('results:' + results);
})*/
// 输出如下： 
/*
 detect: enter 000-00-0000
detect: enter 220-11-4586
detect: enter 55-555-5555
detect: enter 89a-rr-jui7
detect: process 000-00-0000
results:000-00-0000
detect: process 220-11-4586
detect: process 55-555-5555
detect: process 89a-rr-jui7
*/

async.detect(arr, function(item, callback) {
	console.log('detect: enter ' + item);
	setTimeout(function() {
		console.log('detect: process ' + item);
		if (item=='55-555-5555') {
			throw new Error('myerr');
		}else{
			callback(partten.test(item));
		}
		
	}, 200);
}, function(results) {
	console.log('results:' + results);
});
// 输出如下：
/*
detect: enter 000-00-0000
detect: enter 220-11-4586
detect: enter 55-555-5555
detect: enter 89a-rr-jui7
detect: process 000-00-0000
results:000-00-0000
detect: process 220-11-4586
detect: process 55-555-5555

/home/larry/node/async/detect.js:45
			throw new Error('myerr');
			      ^
Error: myerr
    at null._onTimeout (/home/larry/node/async/detect.js:45:10)
    at Timer.listOnTimeout [as ontimeout] (timers.js:112:15)

*/