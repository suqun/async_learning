var async = require('async');
 
//(10+3)*8

function add(n, callback) {
	setTimeout(function() {
		callback(null, n + 3);
	}, 10);
}

function mul(n, callback) {
	setTimeout(function() {
		callback(null, n * 8);
	}, 10);
}

var  addMul = async.compose(add,mul);

addMul(5,function(err,result){
	console.log('result:'+result);
	//result:43
});