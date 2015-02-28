var async = require('async');

var arr = ['000-00-0000', '220-11-4586', '55-555-5555', '89a-rr-jui7'];

var partten = /\d{3}-\d{2}-\d{4}/;

/**
* 使用异步操作对集合中的元素进行筛选。需要注意的是，iterator的callback只有一个参数，只能接收true或false。
*
* 对于出错，该函数没有做出任何处理，直接由nodejs抛出。所以需要注意对Error的处理。
*
* async提供了两种方式：
* 1. 并行执行：filter
* 2. 顺序执行：filterSereis
*/
// filter(arr, iterator(item, callback(test)), callback(results))
async.filter(arr, function(item, callback) {
	console.log('filter: enter ' + item);
	setTimeout(function() {
		console.log('filter: process ' + item);
		callback(partten.test(item));
	}, 200);
}, function(results) {
	console.log('results:' + results);
});

// 输出如下： 
/*
filter: enter 000-00-0000
filter: enter 220-11-4586
filter: enter 55-555-5555
filter: enter 89a-rr-jui7
filter: process 000-00-0000
filter: process 220-11-4586
filter: process 55-555-5555
filter: process 89a-rr-jui7
results:000-00-0000,220-11-4586
*/

async.filter(arr, function(item, callback) {
	console.log('filter: enter ' + item);
	setTimeout(function() {
		console.log('filter: process ' + item);
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
filter: enter 000-00-0000
filter: enter 220-11-4586
filter: enter 55-555-5555
filter: enter 89a-rr-jui7
filter: process 000-00-0000
filter: process 220-11-4586
filter: process 55-555-5555

/home/larry/node/async/filter.js:46
			throw new Error('myerr');
			      ^
Error: myerr
    at null._onTimeout (/home/larry/node/async/filter.js:46:10)
    at Timer.listOnTimeout [as ontimeout] (timers.js:112:15)
*/