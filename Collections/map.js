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
 * 对集合中的每一个元素，执行某个异步操作，得到结果。所有的结果将汇总到最终的callback里。
 *与each的区别是，each只关心操作不管最后的值，而map关心的最后产生的值。
 *
 *所有操作均正确执行，未出错。所有结果按元素顺序汇总给最终的callback。
*/
async.map(arr, function(item, callback) {
	console.log('map1:  enter  '+ item.name);
	setTimeout(function() {
		console.log('map1:  process ' + item.name);
		callback(null, item.name + '!!!');
	}, item.delay);
}, function(err,results) {
	if (err) {
		console.log('map1: '+err);
	} else {
		console.log('results:'+results);
	}
});
// 输出如下： 
//map1:  enter  Larry
//map1:  enter  Jerry
//map1:  enter  Tom
//map1:  process Jerry
//map1:  process Larry
//map1:  process Tom
//results:Larry!!!,Jerry!!!,Tom!!!


/**
* 如果中途出错，立刻将错误、以及已经执行完成的结果汇总给最终callback。未执行完的将会在结果数组中用占个空位。
*/
async.map(arr, function(item, callback) {
	console.log('map2:  enter  '+ item.name);
	setTimeout(function() {
		console.log('map2:  process ' + item.name);
		if (item.name=='Larry') {
			callback('err');
		}else{
			callback(null, item.name + '!!!');
		}
		
	}, item.delay);
}, function(err,results) { 
		console.log('map2: '+err); 
		console.log('results:'+results); 
});
// 输出如下： 
//map2:  enter  Larry
//map2:  enter  Jerry
//map2:  enter  Tom
//map2:  process Jerry
//map2:  process Larry
//map2: err
//results:,Jerry!!!
//map2:  process Tom
