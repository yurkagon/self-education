import RestService from "abstracts/RestService";

class UserService extends RestService<IUser> {
  protected anchor = "/users";
}

const instance = new UserService();

export default instance;
