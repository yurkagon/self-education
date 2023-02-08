import bcrypt from "bcrypt";

import UserService from "./UserService";
import TokenService from "./TokenService";
import MailService from "./MailService";

class AuthService extends UserService {
  private tokenService = new TokenService();
  private mailService = new MailService();

  private bcryptSaltRounds = 10;

  public async authorize(token: string): Promise<IUser> {
    const tokenData = await this.tokenService.getAuthTokenData(token);

    return this.get(tokenData._id);
  }

  public async signIn(data: {
    email: string;
    password: string;
  }): Promise<IAuthData> {
    const { email, password } = data;

    const user = await this.getByEmail(email);
    const hashedPassword = user?.["password"];

    const isPasswordCorrect = await this.comparePasswords(
      password,
      hashedPassword
    );

    if (!isPasswordCorrect) {
      throw new Error("Incorrect password");
    }

    if (!user.isVerified) {
      throw new Error("Not verified");
    }

    const token = await this.tokenService.generateAuthToken(user);

    const authData: IAuthData = {
      user,
      token,
    };

    return authData;
  }

  public async signUp(
    data: Partial<IUser> & { password: string; email: string }
  ): Promise<IUser> {
    const { password } = data;

    const hashedPassword = await this.getPasswordHash(password);

    const dataToDocument = {
      ...data,
      password: hashedPassword,
    };

    const user = await this.create(dataToDocument);

    const emailVerifyToken = await this.tokenService.generateEmailConfirmationToken(
      user
    );
    this.mailService.sendEmailVerification(user, emailVerifyToken);

    return user;
  }

  public async verifyEmail(token: string) {
    const data = await this.tokenService.getEmailConfirmationTokenData(token);

    return this.update(data._id, { isVerified: true });
  }

  private getPasswordHash(password: string): Promise<string> {
    return bcrypt.hash(password, this.bcryptSaltRounds);
  }

  private comparePasswords(
    password: string,
    encryptedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, encryptedPassword);
  }
}

export default AuthService;
