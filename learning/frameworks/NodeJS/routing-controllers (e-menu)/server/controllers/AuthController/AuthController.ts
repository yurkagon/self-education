import {
  Body,
  Post,
  JsonController,
  Param,
  Patch,
  ForbiddenError,
  Get,
  Put,
  CurrentUser,
  Authorized,
} from "routing-controllers";

import { AuthService } from "../../services";

import { IncorrectCredentialsError } from "../../errors";

import { SignInDto, SignUpDto, UpdateProfileDto } from "./dto";

@JsonController("/auth")
class AuthController {
  private service = new AuthService();

  @Authorized()
  @Get("/user")
  public getUser(@CurrentUser() user: IUser): IUser {
    return user;
  }

  @Authorized()
  @Put("/user")
  public update(
    @CurrentUser() user: IUser,
    @Body() data: UpdateProfileDto
  ): Promise<IUser> {
    return this.service.update(user._id, data);
  }

  @Post("/sign_in")
  public async signIn(@Body() data: SignInDto): Promise<IAuthData> {
    try {
      return await this.service.signIn(data);
    } catch {
      throw new IncorrectCredentialsError();
    }
  }

  @Post("/sign_up")
  public signUp(@Body() data: SignUpDto): Promise<IUser> {
    return this.service.signUp({ ...data, role: "admin" });
  }

  @Patch("/confirmation/:token")
  public async verifyEmail(@Param("token") token: string): Promise<IUser> {
    try {
      return await this.service.verifyEmail(token);
    } catch {
      throw new ForbiddenError("Incorrect email confirmation token");
    }
  }
}

export default AuthController;
