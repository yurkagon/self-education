const arr3 = [3, [5, 19, 18], 6, [[7, 19, 31], [14, 18, 20]], 2];
const arr4 = [6, [4, 8], 11, [9, [10]], 13];

Array.prototype.innerMap = function(callback) {
  return this.map( el => Array.isArray(el) ? el.innerMap(callback) : callback(el));
}

console.log(arr3.innerMap(item => item + 2)); // [5, [7, 21, 20], 8, [[9, 21, 33], [16, 20, 22]], 4];
console.log(arr4.innerMap(item => item + 2)); // [8, [6, 10], 13, [11, [12]], 15]
