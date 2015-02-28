var async = require('async');

var arr = [8, 2,9, 4];

/**
* 如果集合里每一个元素都满足条件，则传给最终回调的result为true，否则为false
*/
// every(arr, iterator, callback)
async.every(arr,  function(item, callback) {
	console.log('every: enter ' + item);
	setTimeout(function() {
		console.log('every: process ' + item); 
		callback(item%3==0); 
	}, 200);
}, function(result) { 
	console.log('result:' + result);
});
// 输出如下： 
/*
 some: enter 8
some: enter 2
some: enter 9
some: enter 4
some: process 8
some: process 2
some: process 9
result:true
some: process 4
*/

/**
* 执行过程中出错 
*/
async.every(arr,  function(item, callback) {
	console.log('every: enter ' + item);
	setTimeout(function() {
		console.log('some: process ' + item); 
		if (item=='2') {
			throw new Error('myerr');
		}else{
			callback(item%3==0); 
		}
		
	}, 200);
}, function(result) { 
	console.log('result:' + result);
});
// 输出如下：
/* 
some: enter 8
some: enter 2
some: enter 9
some: enter 4
some: process 8
some: process 2

/home/larry/node/async/some.js:39
			throw new Error('myerr');
			      ^
Error: myerr
    at null._onTimeout (/home/larry/node/async/some.js:39:10)
    at Timer.listOnTimeout [as ontimeout] (timers.js:112:15)

 */


 async.some(arr,  function(item, callback) {
	console.log('some: enter ' + item);
	setTimeout(function() {
		console.log('some: process ' + item); 
		if (item=='4') {
			throw new Error('myerr');
		}else{
			callback(item%3==0); 
		}
		
	}, 200);
}, function(result) { 
	console.log('result:' + result);
});
// 输出如下：
/*
some: enter 8
some: enter 2
some: enter 9
some: enter 4
some: process 8
some: process 2
some: process 9
result:true
some: process 4

/home/larry/node/async/some.js:72
			throw new Error('myerr');
			      ^
Error: myerr
    at null._onTimeout (/home/larry/node/async/some.js:72:10)
    at Timer.listOnTimeout [as ontimeout] (timers.js:112:15)

*/