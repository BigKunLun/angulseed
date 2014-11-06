module.exports = function(err) {
  var args = Array.prototype.slice.call(arguments);
  console.log(args)
  // Keep gulp from hanging on this task
  this.emit('end');
};