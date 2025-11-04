class ArrayIterator {
  private index: number = 0;
  private items: Array<any>;

  constructor(items: Array<any>) {
    this.items = items;
  }

  public reset() {
    this.index = 0;
  }

  public first() {
    this.reset();
    return this.next();
  }

  public next() {
    return this.items[this.index++];
  }

  public hasNext() {
    return this.index <= this.items.length;
  }

  public each(callback) {
    for (let item = this.first(); this.hasNext(); item = this.next()) {
      callback(item);
    }
  }
}
