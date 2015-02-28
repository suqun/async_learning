var async = require('async');

var arr = ['000-00-0000','55-555-5555', '23320-11-4586',, '89a-rr-jui7'];

var partten = /\d{5}-\d{2}-\d{4}/;

/**
* 用于取得集合中满足条件的第一个元素。
* 它分为并行与顺序执行两种方式，分别对应函数detect和detectSeries。
*/
//  detectSeries(array, iterator(item,callback(test)), callback(result)

async.detectSeries(arr, function(item, callback) {
	console.log('detectSeries: enter ' + item);
	setTimeout(function() {
		console.log('detectSeries: process ' + item);
		callback(partten.test(item));
	}, 200);
}, function(results) {
	console.log('results:' + results);
})
// 输出如下： 
/*
 detectSeries: enter 000-00-0000
detectSeries: process 000-00-0000
detectSeries: enter 55-555-5555
detectSeries: process 55-555-5555
detectSeries: enter 23320-11-4586
detectSeries: process 23320-11-4586
results:23320-11-4586
*/

async.detectSeries(arr, function(item, callback) {
	console.log('detectSeries: enter ' + item);
	setTimeout(function() {
		console.log('detectSeries: process ' + item);
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
 detectSeries: enter 000-00-0000
detectSeries: process 000-00-0000
detectSeries: enter 55-555-5555
detectSeries: process 55-555-5555

/home/larry/node/async/detectSeries.js:32
			throw new Error('myerr');
			      ^
Error: myerr
    at null._onTimeout (/home/larry/node/async/detectSeries.js:32:10)
    at Timer.listOnTimeout [as ontimeout] (timers.js:112:15)

*/