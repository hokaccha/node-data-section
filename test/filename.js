var dataSection = require('../index');
var testCase = require('nodeunit').testCase;

module.exports = testCase({
  getAll: function(t) {
    dataSection.getAll(__dirname  + '/data/test1.js', function(err, data) {
      t.ok(!err, 'error is null');
      t.equals(data.foo, 'bar');
      t.done();
    });
  }
});
