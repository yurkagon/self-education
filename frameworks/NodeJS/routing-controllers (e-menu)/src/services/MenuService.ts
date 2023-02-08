import RestService from "abstracts/RestService";

class MenuService extends RestService<IMenu> {
  anchor = "/menu";

  public async updateMenu(
    id: string,
    data: Partial<IMenu>
  ): Promise<IMenuData> {
    const response = await this.request<IMenuData>({
      url: `/menu/${id}`,
      method: "PUT",
      data,
    });

    return response.data;
  }

  public async getMenuDataByRestaurantId(
    restaurantId: string
  ): Promise<IMenuData> {
    const response = await this.request<IMenuData>({
      url: `/menu/data/restaurant/${restaurantId}`,
    });

    return response.data;
  }

  public async getByRestaurantId(restaurantId: string): Promise<IMenu> {
    const response = await this.request<IMenu>({
      url: `/menu/restaurant/${restaurantId}`,
    });

    return response.data;
  }

  public async getCategoryData(
    categoryId: string,
    restaurantId: string
  ): Promise<ICategoryData> {
    const response = await this.request<ICategoryData>({
      url: `/menu/restaurant/${restaurantId}/category/${categoryId}`,
    });

    return response.data;
  }
}

const instance = new MenuService();

export default instance;
