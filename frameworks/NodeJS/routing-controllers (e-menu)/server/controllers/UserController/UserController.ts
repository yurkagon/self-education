import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Authorized,
} from "routing-controllers";

import { UserService } from "../../services";
import { CreateUserDto, UpdateUserDto } from "./dto";

@Authorized("superadmin")
@JsonController("/users")
class UserController {
  private service = new UserService();

  @Get("/:id")
  public get(@Param("id") id: string): Promise<IUser> {
    return this.service.get(id);
  }

  @Get("/")
  public getAll(): Promise<IUser[]> {
    return this.service.getAll();
  }

  @Post("/")
  async create(@Body() data: CreateUserDto): Promise<IUser> {
    const user = await this.service.create(data);

    return user;
  }

  @Put("/:id")
  public async update(
    @Param("id") id: string,
    @Body() data: UpdateUserDto
  ): Promise<IUser> {
    const user = await this.service.update(id, data);

    return user;
  }

  @Delete("/:id")
  public delete(@Param("id") id: string): Promise<IUser> {
    return this.service.delete(id);
  }
}

export default UserController;
