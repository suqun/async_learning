var async = require('async');

var count = 0;
/**
* 按顺序依次执行一组函数。每个函数产生的值，都将传给下一个。
* 如果中途出错，后面的函数将不会被执行。错误信息将传给waterfall最终的callback。之前产生的结果被丢弃。
*
* 这个函数名为waterfall(瀑布)，可以想像瀑布从上到下，中途冲过一层层突起的石头。
*
* 注意，该函数不支持json格式的tasks
*/
async.waterfall([ 
		function(callback) {
			callback(null, 'one', 'two');
		},
		function(arg1, arg2, callback) {
			// arg1 now equals 'one' and arg2 now equals 'two'
			callback(null, 'three');
		},
		function(arg1, callback) {
			// arg1 now equals 'three'
			callback(null, 'done');
		}
	],
	function(err, result) {
		console.log('err:' + err);
		console.log('result:' + result);
	}
);