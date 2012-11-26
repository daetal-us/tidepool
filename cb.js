var couchbase = require('couchbase');

var config = {
	user: 'admin',
	password: 'password',
	hosts: ['192.168.2.254:8091'],
	bucket: 'default'
};

module.exports = function(callback) {
	couchbase.connect(config, callback);
};