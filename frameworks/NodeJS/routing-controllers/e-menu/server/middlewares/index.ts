import WebMiddleware from "./WebMiddleware";
import AuthMiddleware from "./AuthMiddleware";

const middlewares = [AuthMiddleware, WebMiddleware];

export default middlewares;
