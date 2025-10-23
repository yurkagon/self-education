Array.prototype.filterAsync = async function (callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    const elementResult = await callback(this[i], i, this);
    if (elementResult) result.push(this[i]);
  }

  return result;
};

[1, 0, null, 2, undefined, 5]
  .filterAsync(async (el) => {
    return el === 0 || el;
  })
  .then(console.log);
