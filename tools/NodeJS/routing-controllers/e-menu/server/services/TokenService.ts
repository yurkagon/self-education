import jwt from "jsonwebtoken";
import Configuration from "../Configuration";

class TokenService {
  private config = new Configuration();

  public getAuthTokenData(token: string): Promise<ITokenData> {
    return this.verifyToken<ITokenData>(token, this.config.jwtKey);
  }

  public generateAuthToken(user: IUser): Promise<string> {
    const data: ITokenData = {
      _id: user._id.toString(),
      role: user.role,
    };

    return this.generateToken(data, this.config.jwtKey);
  }

  public getEmailConfirmationTokenData(token: string) {
    return this.verifyToken<IEmailConfirmationTokenData>(
      token,
      this.config.emailConfirmSecret
    );
  }

  public generateEmailConfirmationToken(user: IUser): Promise<string> {
    const data: IEmailConfirmationTokenData = {
      _id: user._id.toString(),
      email: user.email,
    };

    return this.generateToken(data, this.config.emailConfirmSecret);
  }

  private generateToken(data: object, secret: string): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(data, secret, (error: any, token: string) => {
        if (error) return reject(error);

        resolve(token);
      });
    });
  }

  private verifyToken<T extends object>(
    token: string,
    secret: string
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, (err: any, tokenData: T) => {
        if (err) {
          return reject(err);
        }

        resolve(tokenData);
      });
    });
  }
}

export default TokenService;
