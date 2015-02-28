var async = require('async');

var arr = [{
	name: 'Larry',
	delay: 200
}, {
	name: 'Budy',
	delay: 100
}, {
	name: 'Tom',
	delay: 300
}, {
	name: 'Alice',
	delay: 100
}];

/**
 * 并行执行，同时最多2个函数并行，传给最终callback。
 */
async.mapLimit(arr, 2, function(item, callback) {
	console.log('map1:  enter  ' + item.name);
	setTimeout(function() {
		console.log('map1:  process ' + item.name);
		callback(null, item.name + '!!!');
	}, item.delay);
}, function(err, results) {
	if (err) {
		console.log('map1: ' + err);
	} else {
		console.log('results:' + results);
	}
});
// 输出如下：
/*
map1:  enter  Larry
map1:  enter  Budy
map1:  process Budy
map1:  enter  Tom
map1:  process Larry
map1:  enter  Alice
map1:  process Alice
map1:  process Tom
results:Larry!!!,Budy!!!,Tom!!!,Alice!!!
*/

/**
* 顺序执行过程中出错，只把错误以及执行完的传给最终callback，未执行的忽略。
*/
async.mapLimit(arr, 2, function(item, callback) {
	console.log('map1:  enter  ' + item.name);
	setTimeout(function() {
		console.log('map1:  process ' + item.name);
		if (item.name == 'Alice') {
			callback('err');
		} else {
			callback(null, item.name + '!!!');
		}
	}, item.delay);
}, function(err, results) {
	console.log('map1: ' + err);
	console.log('results:' + results);
});
// 输出如下：
/*
map1:  enter  Larry
map1:  enter  Budy
map1:  process Budy
map1:  enter  Tom
map1:  process Larry
map1:  enter  Alice
map1:  process Alice
map1: err
results:Larry!!!,Budy!!!,,
map1:  process Tom
*/