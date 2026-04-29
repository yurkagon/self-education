import find from "lodash/find";

import { DatabaseService } from "../abstracts";
import { MenuModel } from "../models";

import DishService from "./DishService";

class MenuService extends DatabaseService<IMenu> {
  protected model = MenuModel;
  private dishService = new DishService();

  public getByRestaurantId(restaurantId: string): Promise<IMenu> {
    return this.findOne({ restaurantId });
  }

  public async getMenuDataByRestaurantId(
    restaurantId: string
  ): Promise<IMenuData> {
    const menu = await this.findOne({ restaurantId });

    return this.setDishesIntoMenu(menu);
  }

  public async getMenuDataById(id: string): Promise<IMenuData> {
    const menu = await this.get(id);

    return this.setDishesIntoMenu(menu);
  }

  public async getCategoryData(
    categoryId: string,
    restaurantId: string
  ): Promise<ICategoryData> {
    const menu = await this.getByRestaurantId(restaurantId);

    const category = find(
      menu.categories,
      (category) => category._id.toString() === categoryId
    );

    const dishes = await this.dishService.getByListOfIds(category.dishes);

    const categoryData: ICategoryData = {
      ...category,
      dishes,
    };

    return categoryData;
  }

  public async updateMenu(
    id: string,
    menu: Partial<IMenu>
  ): Promise<IMenuData> {
    await this.update(id, menu);

    return this.getMenuDataById(id);
  }

  private async setDishesIntoMenu(menu: IMenu): Promise<IMenuData> {
    const categories = menu.categories.map(async (category) => ({
      ...category,
      dishes: await this.dishService.getByListOfIds(category.dishes),
    }));

    return {
      ...menu,
      categories: await Promise.all(categories),
    };
  }
}

export default MenuService;
