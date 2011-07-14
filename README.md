# node-data-section

Read data from comment, like a perl's Data::Section::Simple.

## Install

    $ npm install data-section

## Usage

### basic

``` js
var dataSection = require('data-section');

// getAll
dataSection.get(function(err, data) {
  console.log(data.data1); // foo
  console.log(data.data2); // bar\nbaz
});

// get
dataSection.get('data1', function(err, data) {
  console.log(data); // foo
});

// getAllSync
var data = dataSection.getSync();
console.log(data.data1); // foo
console.log(data.data2); // bar\nbaz

// getSync
console.log( dataSection.getSync('data1') ); // foo
console.log( dataSection.getSync('data2') ); // bar\nbaz

/* __DATA__
@@ data1
foo
@@ data2
bar
baz
__DATA__*/
```

### set filename

``` js
// data1.js
/*__DATA__
@@ foo
bar
__DATA__*/
```

Read from data1.js.

``` js
var dataSection = require('data-section');
var data1js = __dirname + '/data1.js';

// getAll
dataSection.get({ filename: data1js }, function(err, data) {
  console.log(data.foo); // bar
});

// get
dataSection.get({ key: 'foo', filename: data1js }, function(err, data) {
  console.log(data); // bar
});

// getAllSync
var data = dataSection.getSync({ filename: data1js });
console.log(data.foo); // bar

// getSync
var data = dataSection.getSync({ key: 'foo', filename: data1js });
console.log(data); // bar
```

## test

Using nodeunit.

``` js
$ nodeunit test
```
