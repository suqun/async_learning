var async = require('async');

async.applyEach([
	function(name, callback) {
		setTimeout(function() {
			console.log('1:' + name);
		}, 200);
	},
	function(name, callback) {
		setTimeout(function() {
			console.log('2:' + name);
		}, 100);
	},
	function(name, callback) {
		setTimeout(function() {
			console.log('3:' + name);
		}, 100);
	}
], 'larry', function(err) {
	console.log(err);
});

/////////////////////////////////////////
/*
var fn = async.applyEach([

	function(name, callback) {
		setTimeout(function() {
			console.log('1:' + name);
		}, 200);
	},
	function(name, callback) {
		setTimeout(function() {
			console.log('2:' + name);
		}, 100);
	},
	function(name, callback) {
		setTimeout(function() {
			console.log('3:' + name);
		}, 100);
	}
]);

fn('Simple', function(err) {
	console.log(err)
});*/