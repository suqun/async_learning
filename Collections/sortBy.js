var async = require('async');

var arr = [8, 2,9, 4];

/**
* 对集合内的元素进行排序，依据每个元素进行某异步操作后产生的值，从小到大排序。
*/
// sortBy(arr, iterator, callback)
/*async.sortBy(arr, function(item, callback) {
	console.log('sortBy: enter ' + item);
	process.nextTick(function() {
		console.log('sortBy: process ' + item); 
		 callback(null,  item*-1);// x*-1 instead of x, turns the order around
	}); 
}, function(err,results) { 
		console.log('Err:'+err); 
		console.log('results:' + results); 
});*/
// 输出如下： 
/*
 sortBy: enter 8
sortBy: enter 2
sortBy: enter 9
sortBy: enter 4
sortBy: process 8
sortBy: process 2
sortBy: process 9
sortBy: process 4
Err:null
results:9,8,4,2 
*/

/**
* 执行过程中出错，只把错误传给最终callback，结果是undefined
*/
async.sortBy(arr,  function(item, callback) {
	console.log('sortBy: enter ' + item);
	process.nextTick(function() {
		console.log('sortBy: process ' + item);
		if (item == '9') {
			callback('err');
		} else {
			callback(null,  item);
		}
	});
}, function(err, results) {
	console.log('Err:' + err);
	console.log('results:' + results);
});
// 输出如下：
/* 
 sortBy: enter 8
sortBy: enter 2
sortBy: enter 9
sortBy: enter 4
sortBy: process 8
sortBy: process 2
sortBy: process 9
Err:err
results:undefined
sortBy: process 4
 */