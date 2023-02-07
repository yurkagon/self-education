class Item {
  name: string;

  constructor(name: string)  {
    this.name = name;
  }
}

const withPrice = instance => {
  instance.price = 0;

  instance.setPrice = function(price) {
    this.price = price;
  }

  return instance;
}

const pen = new Item('pen');
const penWithPrice = withPrice(pen);
penWithPrice.setPrice(500);

