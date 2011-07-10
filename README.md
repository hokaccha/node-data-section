# node-data-section

Read data from comment, like a perl's Data::Section::Simple.

## Install

    $ npm install data-section

## Usage

### basic

``` js
var dataSection = require('data-section');

// getAll
dataSection.getAll(function(err, data) {
  console.log(data.data1); // foo
  console.log(data.data2); // bar\nbaz
});

// get
dataSection.get('data1', function(err, data) {
  console.log(data); // foo
});

// getAllSync
var data = dataSection.getAllSync();
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

// getAll
dataSection.getAll(__dirname + '/data1.js', function(err, data) {
  console.log(data.foo); // bar
});
```

## test

Using nodeunit.

``` js
$ nodeunit test
```
