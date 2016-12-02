require.ensure(['./Person'], function(require) {
  var content = require('./Person');
  document.open();
  document.write('<h1>' + content + '</h1>');
  document.close();
});