import { Interceptor, InterceptorInterface, Action } from "routing-controllers";

@Interceptor()
class MongooseDataHandler implements InterceptorInterface {
  public intercept(action: Action, content: any) {
    return action.response.send(content);
  }
}

export default MongooseDataHandler;
