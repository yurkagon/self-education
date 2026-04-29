import { DatabaseService } from "../abstracts";
import { DishModel } from "../models";

class DishService extends DatabaseService<IDish> {
  protected model = DishModel;
}

export default DishService;
