var dataSection = require('../index');
var testCase = require('nodeunit').testCase;

module.exports = testCase({
  getAll: function(t) {
    dataSection.getAll(function(err, data) {
      t.ok(!err, 'error is null');
      t.equals(data.foo1, 'bar1', 'get hash data');
      t.equals(data.foo2, 'bar2-1\nbar2-2', 'multi line');
      t.equals(data.foo3, 'bar3', 'separate section');
      t.done();
    });
  },
  get: function(t) {
    dataSection.get('foo1', function(err, data) {
      t.ok(!err, 'error is null');
      t.equals(data, 'bar1', 'get only foo1');
      t.done();
    });
  },
  getAllSync: function(t) {
    var data = dataSection.getAllSync();
    t.equals(data.foo1, 'bar1', 'get hash data');
    t.equals(data.foo2, 'bar2-1\nbar2-2', 'multi line');
    t.equals(data.foo3, 'bar3', 'separate section');
    t.done();
  },
  getSync: function(t) {
    var data = dataSection.getSync('foo1');
    t.equals(data, 'bar1', 'get only foo1');
    t.done();
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
