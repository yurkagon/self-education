const Module = (() => {
	const items = [];

  return {
  	getItem: index => items[index],
    addItem: item => items.push(item),
    getArray: () => items,
    log: () => console.log(items)
  };
})();

Module.addItem('some item');
Module.addItem('another item');
Module.log();
