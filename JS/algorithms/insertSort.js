const insert = (arr, value, curr) => {
	let i;
	for(i = curr; i >= 0 && arr[i] > value; i--) {
  	arr[i + 1] = arr[i];
  }
  arr[i + 1] = value;
}

const insertSort = arr => {
	for(let i = 0; i < arr.length; i++) {
  	const value = arr[i + 1];
    if (value) {
    	insert(arr, arr[i + 1], i);
    }
  }
}

const array = [22, 11, 99, 88, 9, 7, 42];
insertSort(array);
console.log(array);
