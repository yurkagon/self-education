// test helpers
const test = (text, callback) => {
  try {
    callback();
  } catch (err) {
    console.group();
    console.log(text);
    console.log(err);
    console.groupEnd();
  }
}
const it = test, describe = test;

const expect = value => ({
  toBe: expectedValue => {
    if (value !== expectedValue) throw new Error(
      `${value} !== ${expectedValue}`
    )
  }
});
////////////////////////


// recursive
const binarySearch = (arr, value, minIndex, maxIndex) => {
  const min = typeof minIndex === 'number' ? minIndex : 0;
  const max = typeof maxIndex === 'number' ? maxIndex : (arr.length - 1);

  if (min > max) return -1;

  const mid = Math.floor((max + min) / 2);
  const midValue = arr[mid];

  if (midValue < value) {
    return binarySearch(arr, value, mid + 1, max);
  }
  if (midValue > value) {
    return binarySearch(arr, value, min, mid - 1);
  }

  return mid;
}


// default
const binarySearch = (array, targetValue) => {
	let min = 0;
	let max = array.length - 1;
  let guess;

  while(min <= max) {
    guess = Math.floor((max + min)/2, 10);


    if(array[guess] === targetValue) {
      return guess;
    } else if (array[guess] < targetValue) {
      min = guess + 1;
    } else if (array[guess] > targetValue) {
      max = guess - 1;
    }
  }

	return -1;
};


describe('binarySearch', () => {
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];

  test('not exist', () => {
    expect(binarySearch(primes, 4)).toBe(-1);
  });
  test('second', () => {
    expect(binarySearch(primes, 3)).toBe(1);
  });
  test('first', () => {
    expect(binarySearch(primes, 2)).toBe(0);
  });
  test('last', () => {
    expect(binarySearch(primes, 97)).toBe(24);
  });
  test('before last', () => {
    expect(binarySearch(primes, 89)).toBe(23);
  });
  it('should find all elements', () => {
    primes.forEach((number, index) => {
      const foundIndex = binarySearch(primes, number);

      expect(foundIndex).toBe(index);
      expect(primes[foundIndex]).toBe(number);
    });
  });
});
