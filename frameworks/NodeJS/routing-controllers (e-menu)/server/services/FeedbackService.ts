import { DatabaseService } from "../abstracts";
import { FeedbackModel } from "../models";

class FeedbackService extends DatabaseService<IFeedback> {
  protected model = FeedbackModel;

  public getAllByRestaurantId(restaurantId: string): Promise<IFeedback[]> {
    return this.getAll({ restaurantId });
  }
}

export default FeedbackService;
