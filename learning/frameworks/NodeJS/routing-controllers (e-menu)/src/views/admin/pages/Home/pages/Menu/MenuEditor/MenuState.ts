import { action, observable, runInAction } from "mobx";

import cloneDeep from "lodash/cloneDeep";
import map from "lodash/map";
import find from "lodash/find";
import findIndex from "lodash/findIndex";

import MenuService from "services/MenuService";
import DishService from "services/DishService";

import { INewDishFormFields } from "./NewDishForm/types";
import { INewCategoryFormFields } from "./NewCategoryForm/types";

import { IMenuEditorCategory } from "./types";

class MenuState {
  @observable public categories: IMenuEditorCategory[] = [];
  @observable public error: Error | string = null;

  public menuId: string;
  public restaurantId: string;
  public ownerId: string;

  public async loadMenu(restaurantId: string) {
    try {
      const menu = await MenuService.getMenuDataByRestaurantId(restaurantId);

      runInAction(() => {
        this.restaurantId = menu.restaurantId;
        this.menuId = menu._id;
        this.ownerId = menu.ownerId;
        this.categories = menu.categories;
      });
    } catch (err) {
      this.setError(err);
    }
  }

  @action
  public addNewCategory = (category: INewCategoryFormFields): void => {
    this.categories.push({
      temp_id: Date.now().toString(),
      name: { ua: category.name },
      dishes: [],
    });

    this.onUpdate();
  };

  public async addNewDishToCategory(
    dish: INewDishFormFields,
    categoryId: string
  ) {
    try {
      const newDish = await DishService.create({
        ...dish,
        restaurantId: this.restaurantId,
      });

      runInAction(() => {
        const category = find(this.categories, { _id: categoryId });

        category.dishes.push(newDish);
        this.categories = cloneDeep(this.categories);

        this.onUpdate();
      });
    } catch (error) {
      this.setError(error);
    }
  }

  @action
  public moveCategory = (categoryId: string, destIndex: number): void => {
    const sourceCategoryIndex = this.categories.findIndex(
      ({ _id }) => categoryId === _id
    );

    if (sourceCategoryIndex >= 0) {
      const [sourceCategory] = this.categories.splice(sourceCategoryIndex, 1);

      this.categories.splice(destIndex, 0, sourceCategory);

      this.onUpdate();
    }
  };

  @action
  public moveDishToCategory = (
    sourceCategoryId: string,
    sourceIndex: number,
    destCategoryId: string,
    destIndex: number
  ): void => {
    const sourceCategoryIndex = this.categories.findIndex(
      ({ _id }) => sourceCategoryId === _id
    );

    const destCategoryIndex = this.categories.findIndex(
      (cat) => destCategoryId === cat._id
    );

    const [dishToMove] = this.categories[sourceCategoryIndex].dishes.splice(
      sourceIndex,
      1
    );

    this.categories[destCategoryIndex].dishes.splice(destIndex, 0, dishToMove);

    this.onUpdate();
  };

  async onUpdate(): Promise<void> {
    try {
      const updatedMenu = await MenuService.updateMenu(this.menuId, {
        categories: this.categories.map((category) => ({
          ...category,
          dishes: map(category.dishes, "_id"),
          temp_id: undefined,
        })) as ICategory[],
      });

      runInAction(() => {
        this.categories = [...updatedMenu.categories];
      });
    } catch (error) {
      this.setError(error);
    }
  }

  async removeDish(categoryInd: number, dishId: string) {
    try {
      await DishService.delete(dishId);

      runInAction(() => {
        const ind = findIndex(this.categories[categoryInd].dishes, {
          _id: dishId,
        });

        if (ind >= 0) {
          this.categories[categoryInd].dishes.splice(ind, 1);
        }

        this.onUpdate();
      });
    } catch (error) {
      this.setError(error);
    }
  }

  async removeCategory(categoryInd: number) {
    try {
      await Promise.all(
        this.categories[categoryInd].dishes.map((dish) =>
          DishService.delete(dish._id)
        )
      );

      runInAction(() => {
        this.categories.splice(categoryInd, 1);

        this.onUpdate();
      });
    } catch (error) {
      this.setError(error);
    }
  }

  @action
  public reset(): void {
    this.categories = [];
    this.menuId = null;
    this.restaurantId = null;
    this.ownerId = null;

    this.error = null;
  }

  @action
  private setError(error: Error | string) {
    console.error(error);

    this.error = error;
  }
}

export default new MenuState();
