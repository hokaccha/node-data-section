var dataSection = require('../index');
var testCase = require('nodeunit').testCase;
var test1js = __dirname  + '/data/test1.js';

module.exports = testCase({
  get: function(t) {
    dataSection.get('foo1', function(err, data) {
      t.ok(!err, 'error is null');
      t.equals(data, 'bar1', 'get only foo1');
      t.done();
    });
  },
  getAll: function(t) {
    dataSection.get(function(err, data) {
      t.ok(!err, 'error is null');
      t.equals(data.foo1, 'bar1', 'get hash data');
      t.equals(data.foo2, 'bar2-1\nbar2-2', 'multi line');
      t.equals(data.foo3, 'bar3', 'separate section');
      t.done();
    });
  },
  getAllSync: function(t) {
    var data = dataSection.getSync();
    t.equals(data.foo1, 'bar1', 'get hash data');
    t.equals(data.foo2, 'bar2-1\nbar2-2', 'multi line');
    t.equals(data.foo3, 'bar3', 'separate section');
    t.done();
  },
  getSync: function(t) {
    var data = dataSection.getSync('foo1');
    t.equals(data, 'bar1', 'get only foo1');
    t.done();
  },
  setFilename: function(t) {
    (function() {
      var data = dataSection.getSync({ filename: test1js });
      t.equals(data.foo, 'bar');
    })();

    dataSection.get({ filename: test1js }, function(err, data) {
      t.ok(!err, 'error is null');
      t.equals(data.foo, 'bar');
      t.done();
    });
  },
  setKey: function(t) {
    (function() {
      var foo = dataSection.getSync({ key: 'foo', filename: test1js });
      t.equals(foo, 'bar');
    })();

    dataSection.get({ key: 'foo', filename: test1js }, function(err, foo) {
      t.ok(!err, 'error is null');
      t.equals(foo, 'bar');
      t.done();
    });
  },
  error: function(t) {
    t.throws(function() {
      dataSection.getSync({ filename: 'foo.js' });
    }, 'no such file');

    dataSection.get({ filename: 'foo.js' }, function(err) {
      t.ok(/^ENOENT, No such file or directory/.test(err.message));
      t.done();
    });
  }
});

/*__DATA__
@@ foo1
bar1
@@ foo2
bar2-1
bar2-2
__DATA__*/

/* __DATA__
@@foo3
bar3
__DATA__ */
