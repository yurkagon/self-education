import RestService from "abstracts/RestService";

class DishService extends RestService<IDish> {
  public anchor = "/dishes";
}

const instance = new DishService();

export default instance;
