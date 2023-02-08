import MapStore from "abstracts/store/MapStore";
import MenuService from "services/MenuService";

class MenuStore extends MapStore<IMenu> {
  public async load(restaurantId: string): Promise<void> {
    const data = await MenuService.getByRestaurantId(restaurantId);

    this.setData(data);
  }
}

const instance = new MenuStore();

export default instance;
