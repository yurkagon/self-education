import RestService from "abstracts/RestService";

class FeedbackService extends RestService<IFeedback> {
  public anchor = "/feedbacks";

  public async getAllByRestaurantId(restaurantId: string): Promise<IFeedback> {
    const response = await this.request<IFeedback>({
      url: `/feedbacks/restaurant/${restaurantId}`,
    });

    return response.data;
  }
}

const instance = new FeedbackService();

export default instance;
