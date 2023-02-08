import { DatabaseService } from "../abstracts";
import { RestaurantModel } from "../models";

class RestaurantService extends DatabaseService<IRestaurant> {
  protected model = RestaurantModel;

  public getBySlug(slug: string): Promise<IRestaurant> {
    return this.findOne({ slug });
  }

  public getAllByOwnerId(ownerId: string): Promise<IRestaurant[]> {
    return this.getAll({ ownerId });
  }
}

export default RestaurantService;
