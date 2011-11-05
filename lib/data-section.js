var fs = require('fs');

var dataSection = module.exports;

dataSection.encoding = 'utf8';

dataSection.get = function(opt) {
  var callback = arguments[ arguments.length - 1];
  if (typeof callback !== 'function') {
    throw new Error('callback function required');
  }
  opt = _parseOpt(opt);

  fs.readFile(opt.filename, opt.encoding, function(err, data) {
    if (err) {
      callback(err);
      return;
    }
    var ret = _parseData(data);
    callback(err, opt.key ? ret[opt.key] : ret);
  });
};

dataSection.getSync = function(opt) {
  opt = _parseOpt(opt);
  var ret = _parseData(fs.readFileSync(opt.filename, opt.encoding));
  return opt.key ? ret[opt.key] : ret;
};

function _parseData(data) {
  var ret = {};
  data.replace(/\/\*\s*__DATA__([\s\S]*?)__DATA__\s*\*\//g, function() {
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

function _parseOpt(opt) {
  opt = opt || {};
  if (typeof opt === 'string') {
    opt = { key: opt };
  }
  return {
    key: opt.key,
    filename: opt.filename || module.parent.parent.filename,
    encoding: opt.encoding || dataSection.encoding
  };
}
