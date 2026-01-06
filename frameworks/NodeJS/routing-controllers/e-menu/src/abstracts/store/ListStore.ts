import { action } from "mobx";
import first from "lodash/first";

import Store from "./Store";

abstract class ListStore<T extends { _id: string }> extends Store<T[]> {
  @action
  public push(newItem: T) {
    const newData = [...(this.data || []), newItem];

    this.data = newData;
  }

  public getById(id: string): T {
    if (!this.isDataExist) return null;

    return this.data.find((el) => el._id === id);
  }

  @action
  public put(target: T): T {
    const index = this.isDataExist
      ? this.data.findIndex((el) => el._id === target._id)
      : -1;

    if (index === -1) {
      this.push(target);

      return target;
    }

    const currentItem = this.data[index];

    const newItem = {
      ...currentItem,
      ...target,
    };

    const newData = [...this.data];
    newData[index] = newItem;

    this.data = newData;

    return newItem;
  }

  @action
  public replace(target: T): T {
    const index = this.isDataExist
      ? this.data.findIndex((el) => el._id === target._id)
      : -1;

    if (index === -1) {
      this.push(target);

      return target;
    }

    const newData = [...this.data];
    newData[index] = target;

    this.data = newData;

    return target;
  }

  @action
  public removeById(id: string): T {
    if (!this.isDataExist) return null;

    const index = this.data.findIndex((el) => el._id === id);
    if (index !== -1) {
      const newData = [...this.data];

      const deletedElement = first(newData.splice(index, 1));

      this.data = newData;

      return deletedElement;
    }
  }
}

export default ListStore;
