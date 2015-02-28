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
 * The same as map, only the iterator is applied to each item in arr in series. 
 *
 *顺序执行，一个完了才执行下一个。所有操作均正确执行，未出错。所有结果按元素顺序汇总给最终的callback。
*/
async.mapSeries(arr, function(item, callback) {
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
//map1:  process Larry
//map1:  enter  Jerry
//map1:  process Jerry
//map1:  enter  Tom
//map1:  process Tom
//results:Larry!!!,Jerry!!!,Tom!!!

/**
* 顺序执行过程中出错，只把错误以及执行完的传给最终callback。未执行的忽略。
*/
async.mapSeries(arr, function(item, callback) {
	console.log('map2:  enter  '+ item.name);
	setTimeout(function() {
		console.log('map2:  process ' + item.name);
		if (item.name=='Jerry') {
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
//map2:  process Larry
//map2:  enter  Jerry
//map2:  process Jerry
//map2: err
//results:Larry!!!,
