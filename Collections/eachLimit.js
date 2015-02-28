var async = require('async');

var arr = [{
	name: 'Larry',
	delay: 200
}, {
	name: 'Jerry',
	delay: 500
}, {
	name: 'Tom',
	delay: 300
},{
	name: 'xiao p',
	delay: 100
}];

/**
* 分批执行，第二个参数是每一批的个数。每一批内并行执行，但批与批之间按顺序执行。
*/
async.eachLimit(arr, 2,function(item, callback) {
	console.log('eachLimit1:  enter  '+ item.name);
	setTimeout(function() {
		console.log('eachLimit1:  process ' + item.name);
		callback();
	}, item.delay);
}, function(err) {
	if (err) {
		console.log('eachLimit1:  A item failed to process');
	} else {
		console.log('eachLimit1:  All itmes have been processed successfully');
	}
});
// 输出如下：
//eachLimit1:  enter  Larry
//eachLimit1:  enter  Jerry
//eachLimit1:  process Larry
//eachLimit1:  enter  Tom
//eachLimit1:  process Jerry
//eachLimit1:  enter  xiao p
//eachLimit1:  process Tom
//eachLimit1:  process xiao p
//eachLimit1:  All itmes have been processed successfully

/**
* 如果中途出错，错误将马上传给最终的callback。同一批中的未执行完的任务还将继续执行，但下一批及以后的不再执行。
*/
async.eachLimit(arr, 2,function(item, callback) {
	console.log('eachLimit2:  enter  '+ item.name);
	setTimeout(function() {
		console.log('eachLimit2:  process ' + item.name);
		if (item.name == 'Larry') {
			callback('err');
		} 
	}, item.delay);
}, function(err) {
	if (err) {
		console.log('eachLimit2:  A item failed to process');
	} else {
		console.log('eachLimit2:  All itmes have been processed successfully');
	}
});
// 输出如下：
//eachLimit2:  enter  Larry
//eachLimit2:  enter  Jerry
//eachLimit2:  process Larry
//eachLimit2:  A item failed to process
//eachLimit2:  process Jerry
