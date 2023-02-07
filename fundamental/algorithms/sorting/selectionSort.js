const swap = (arr, i1, i2) => {
	const el1 = arr[i1];

  arr[i1] = arr[i2];
  arr[i2] = el1;

  return arr;
};

const findMinIndex = (arr, minIndex = 0) => {
	let minValue = arr[minIndex];

  for(let i = minIndex + 1; i < arr.length; i++) {
  	if (minValue > arr[i]) {
    	minValue = arr[i];
      minIndex = i;
    }
  }

  return minIndex;
};

const selectionSort = (arr) => {
	for(let i = 0; i < arr.length; i++) {
  	const minIndex = findMinIndex(arr, i);
    if(i !== minIndex) {
    	swap(arr, i, minIndex);
    }
  }
  return arr;
};

const array = [2, 1, 4, 1, 6, 21, 34, 6];

console.log(selectionSort(array));
