import head from "lodash/head";
import { computed } from "mobx";

import MapStore from "abstracts/store/MapStore";
import RestaurantService from "services/RestaurantService";

class RestaurantStore extends MapStore<IRestaurant> {
  @computed public get name() {
    return this.data?.name?.ua;
  }

  public async loadBySlug(slug: string): Promise<IRestaurant> {
    const restaurant = await RestaurantService.getBySlug(slug);

    this.setData(restaurant);

    return restaurant;
  }

  public async loadByOwnerId(id: string): Promise<IRestaurant> {
    const restaurantList = await RestaurantService.getAllByOwnerId(id);

    const restaurant = head(restaurantList);

    this.setData(restaurant);

    return restaurant;
  }
}

const instance = new RestaurantStore();

export default instance;
