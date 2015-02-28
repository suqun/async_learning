var async = require('async');

var arr = ['000-00-0000', '220-11-4586', '55-555-5555', '89a-rr-jui7'];

var partten = /\d{3}-\d{2}-\d{4}/;

/**
* 使用异步操作对集合中的元素进行筛选。需要注意的是，iterator的callback只有一个参数，只能接收true或false。
*
* 对于出错，该函数没有做出任何处理，直接由nodejs抛出。所以需要注意对Error的处理。
*
*reject跟filter正好相反，当测试为true时，抛弃之
*
* reject提供了两种方式：
* 1. 并行执行：reject
* 2. 顺序执行：rejectSeries
*/
// rejectSeries(arr, iterator(item, callback(test)), callback(results))
async.rejectSeries(arr, function(item, callback) {
	console.log('rejectSeries: enter ' + item);
	setTimeout(function() {
		console.log('rejectSeries: process ' + item);
		callback(partten.test(item));
	}, 200);
}, function(results) {
	console.log('results:' + results);
});
// 输出如下：
/* 
rejectSeries: enter 000-00-0000
rejectSeries: process 000-00-0000
rejectSeries: enter 220-11-4586
rejectSeries: process 220-11-4586
rejectSeries: enter 55-555-5555
rejectSeries: process 55-555-5555
rejectSeries: enter 89a-rr-jui7
rejectSeries: process 89a-rr-jui7
results:55-555-5555,89a-rr-jui7
*/