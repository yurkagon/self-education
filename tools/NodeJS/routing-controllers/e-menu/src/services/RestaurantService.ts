import RestService from "abstracts/RestService";

class RestaurantService extends RestService<IRestaurant> {
  protected anchor = "/restaurants";

  public async getBySlug(slug: string): Promise<IRestaurant> {
    const response = await this.request({
      url: `/restaurants/slug/${slug}`,
    });

    return response.data;
  }

  public async getAllByOwnerId(ownerId: string): Promise<IRestaurant[]> {
    const response = await this.request({
      url: `/restaurants/owner/${ownerId}`,
    });

    return response.data;
  }
}

const instance = new RestaurantService();

export default instance;
