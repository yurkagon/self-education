Function.prototype.ownBind = function (newContext) {
  const self = this;
  return function () {
    return self.apply(newContext, arguments);
  }
}
