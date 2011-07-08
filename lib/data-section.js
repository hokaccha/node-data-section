var fs = require('fs');

var dataSection = module.exports;

dataSection.encoding = 'utf8';

dataSection.getAll = function(filename, callback) {
  if (!callback) {
    callback = filename;
    filename = module.parent.parent.filename;
  }
  fs.readFile(filename, dataSection.encoding, function(err, data) {
    var ret = _parseData(data);
    callback(err, ret);
  });
};

dataSection.get = function(name, filename, callback) {
  if (typeof filename === 'function') {
    callback = filename;
    filename = module.parent.parent.filename;
  }
  dataSection.getAll(filename, function(err, datas) {
    callback(err, datas[name]);
  });
};

dataSection.getAllSync = function(filename) {
  filename = filename || module.parent.parent.filename;
  var data = fs.readFileSync(filename, dataSection.encoding);
  return _parseData(data);
};

dataSection.getSync = function(name, filename) {
  return dataSection.getAllSync(filename)[name];
};

function _parseData(data) {
  var ret = {};
  data.replace(/\/\*\s*__DATA__([\s\S]*?)__DATA__\s*\*/\/g, function() {
    var name;
    arguments[1].trim().split(/\n/).forEach(function(line) {
      var m = line.match(/^@@\s*(.+)/);
      if (m) {
        name = m[1];
        ret[name] = '';
      }
      else if (ret[name] !== undefined) {
        ret[name] += (ret[name] ? '\n' : '') + line;
      }
    });
  });
  return ret;
}

