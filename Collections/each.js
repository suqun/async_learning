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
* 所有操作并发执行，且全部未出错，最终得到的err为undefined。注意最终callback只有一个参数err。
*/
// each

async.each(arr, function(item, callback) { 
	console.log('async-each:  enter  '+ item.name);
	setTimeout(function() {
		console.log('async-each1:  process ' + item.name);
		callback();
	}, item.delay);
}, function(err) {
	if (err) {
		console.log('async-each1:  A item failed to process');
	} else {
		console.log('async-each1:  All itmes have been processed successfully');
	}
});
// 输出如下：
//async-each:  enter  Larry
//async-each:  enter  Jerry
//async-each:  enter  Tom
//async-each1:  process Jerry
//async-each1:  process Larry
//async-each1:  process Tom
//async-each1:  All itmes have been processed successfully


/**
* 如果中途出错，则出错后马上调用最终的callback。其它未执行完的任务继续执行。
*/
async.each(arr, function(item, callback) {
	console.log('async-each2:  enter  '+ item.name);
	setTimeout(function() { 
		console.log('async-each2:  process ' + item.name);
		if (item.name == 'Larry') {
			callback('err');
		} 
	}, item.delay);
}, function(err) {
	if (err) {
		console.log('async-each2:  A item failed to process');
	} else {
		console.log('async-each2:  All itmes have been processed successfully');
	}
});
// 输出如下：
//async-each2:  enter  Larry
//async-each2:  enter  Jerry
//async-each2:  enter  Tom
//async-each2:  process Jerry
//async-each2:  process Larry
//async-each2:  A item failed to process
//async-each2:  process Tom
