import { ForbiddenError } from "routing-controllers";

class IncorrectCredentialsError extends ForbiddenError {
  constructor() {
    super("Incorrect login or password");
  }
}

export default IncorrectCredentialsError;
