var async = require('async');

var arr = [1, 2, 3, 4];

/**
 * Reduce可以让我们给定一个初始值，用它与集合中的每一个元素做运算，最后得到一个值。
 *reduce从左向右来遍历元素，如果想从右向左，可使用reduceRight。
 */
// reduce(arr, memo, iterator, callback)
async.reduce(arr, 1, function(memo, item, callback) {
	console.log('reduce: enter ' + item);
	process.nextTick(function() {
		console.log('reduce: process ' + item); 
		 callback(null, memo * item);
	}); 
}, function(err,result) { 
		console.log('Err:'+err); 
		console.log('result:' + result); 
});
// 输出如下： 
/*
reduce: enter 1
reduce: process 1
reduce: enter 2
reduce: process 2
reduce: enter 3
reduce: process 3
reduce: enter 4
reduce: process 4
Err:undefined
result:24
*/
/**
* 顺序执行过程中出错，只把错误传给最终callback，结果是undefined
*/
async.reduce(arr, 1, function(memo, item, callback) {
	console.log('reduce: enter ' + item);
	process.nextTick(function() {
		console.log('reduce: process ' + item);
		if (item == '3') {
			callback('err');
		} else {
			callback(null, memo * item);
		}
	});
}, function(err, result) {
	console.log('Err:' + err);
	console.log('result:' + result);
});
// 输出如下：
/* 
reduce: enter 1
reduce: process 1
reduce: enter 2
reduce: process 2
reduce: enter 3
reduce: process 3
Err:err
result:undefined
 */