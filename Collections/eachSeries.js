var async = require('async');

var arr = [{
	name: 'Larry',
	delay: 200
}, {
	name: 'Jerry',
	delay: 100
}, {
	name: 'Tom',
	delay: 300
}, ];

/**
* 与each相似，但不是并行执行。而是一个个按顺序执行。
*/
async.eachSeries(arr, function(item, callback) {
	console.log('async-eachSeries1:  enter  '+ item.name);
	setTimeout(function() {
		console.log('async-eachSeries1:  process ' + item.name);
		callback();
	}, item.delay);
}, function(err) {
	if (err) {
		console.log('async-eachSeries1:  A item failed to process');
	} else {
		console.log('async-eachSeries1:  All itmes have been processed successfully');
	}
});
// 输出如下：
//async-eachSeries1:  enter  Larry
//async-eachSeries1:  process Larry
//async-eachSeries1:  enter  Jerry
//async-eachSeries1:  process Jerry
//async-eachSeries1:  enter  Tom
//async-eachSeries1:  process Tom
//async-eachSeries1:  All itmes have been processed successfully

/**
* 如果中途出错，则马上把错误传给最终的callback，还未执行的不再执行。
*/
async.eachSeries(arr, function(item, callback) {
	console.log('async-eachSeries2:  enter  '+ item.name);
	setTimeout(function() {
		console.log('async-eachSeries2:  process ' + item.name);
		if (item.name == 'Larry') {
			callback('err');
		}  
	}, item.delay);
}, function(err) {
	if (err) {
		console.log('async-eachSeries2:  A item failed to process');
	} else {
		console.log('async-eachSeries2:  All itmes have been processed successfully');
	}
});

// 输出如下：
//async-eachSeries2:  enter  Larry
//async-eachSeries2:  process Larry
//async-eachSeries2:  A item failed to process

