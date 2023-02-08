import { DatabaseService } from "../abstracts";
import { UserModel } from "../models";

class UserService extends DatabaseService<IUser> {
  protected model = UserModel;

  public async getByEmail(email: string): Promise<IUser> {
    const user = await this.model.findOne({
      email,
    });

    return user.toObject();
  }
}

export default UserService;
