import {
  Body,
  Post,
  JsonController,
  Get,
  Put,
  Param,
  Delete,
  Authorized,
  CurrentUser,
  ForbiddenError,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

import { DishService, RestaurantService } from "../../services";
import { CreateDishDto, UpdateDishDto } from "./dto";

@JsonController("/dishes")
class DishesController {
  private service = new DishService();
  private restaurantService = new RestaurantService();

  @Get("/:id")
  public get(@Param("id") id: string): Promise<IDish> {
    return this.service.get(id);
  }

  @Authorized("superadmin")
  @Get("/")
  public getAll(): Promise<IDish[]> {
    return this.service.getAll();
  }

  @OpenAPI({ security: [{ basicAuth: [] }] })
  @Authorized()
  @Post("/")
  public create(
    @CurrentUser() user: IUser,
    @Body() data: CreateDishDto
  ): Promise<IDish> {
    this.checkCreatePolicy(user);

    return this.service.create({
      ...data,
      ownerId: user._id,
    });
  }

  @OpenAPI({ security: [{ basicAuth: [] }] })
  @Authorized()
  @Put("/:id")
  public async update(
    @CurrentUser() user: IUser,
    @Param("id") id: string,
    @Body() data: UpdateDishDto
  ): Promise<IDish> {
    await this.checkAccessPolicy(id, user);

    return this.service.update(id, data);
  }

  @OpenAPI({ security: [{ basicAuth: [] }] })
  @Authorized()
  @Delete("/:id")
  public async delete(
    @CurrentUser({ required: true }) user: IUser,
    @Param("id") id: string
  ): Promise<IDish> {
    await this.checkAccessPolicy(id, user);

    return this.service.delete(id);
  }

  private async checkAccessPolicy(dishId: string, user: IUser) {
    const isAdmin = ["admin", "superadmin"].includes(user.role);
    if (isAdmin) return;

    const dish = await this.service.get(dishId);
    const restaurant = await this.restaurantService.get(dish.restaurantId);

    if (restaurant.ownerId.toString() !== user._id.toString()) {
      throw new ForbiddenError(
        "User don`t have permission for update this dish!"
      );
    }
  }

  private checkCreatePolicy(user: IUser) {
    const isAdmin = user.role === "admin";

    if (!isAdmin) {
      throw new ForbiddenError("You don`t have permission for creating Dish!");
    }
  }
}

export default DishesController;
