import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  BadRequestError,
  CurrentUser,
  ForbiddenError,
} from "routing-controllers";

import { RestaurantService, MenuService } from "../../services";
import { CreateRestaurantDto, UpdateRestaurantDto } from "./dto";

@JsonController("/restaurants")
class RestaurantController {
  private service = new RestaurantService();
  private menuService = new MenuService();

  @Get("/slug/:slug")
  public getBySlug(@Param("slug") slug: string) {
    return this.service.getBySlug(slug);
  }

  @Get("/owner/:id")
  public async getAllByOwnerId(
    @Param("id") id: string,
    @CurrentUser({ required: true }) user: IUser
  ): Promise<IRestaurant[]> {
    const isOwner = id === user._id.toString();
    const isSuperadmin = user.role === "superadmin";
    const hasAccess = isOwner || isSuperadmin;

    if (!hasAccess) {
      throw new ForbiddenError("No access rights");
    }

    const restaurants = await this.service.getAllByOwnerId(id);

    return restaurants;
  }

  @Get("/:id")
  public get(@Param("id") id: string) {
    return this.service.get(id);
  }

  @Get("/")
  public getAll() {
    return this.service.getAll();
  }

  @Post("/")
  public async create(@Body() data: CreateRestaurantDto) {
    try {
      const restaurant = await this.service.create(data);

      await this.menuService.create({
        ownerId: restaurant.ownerId,
        restaurantId: restaurant._id,
      });

      return restaurant;
    } catch (err) {
      throw new BadRequestError(err);
    }
  }

  @Put("/:id")
  public update(@Param("id") id: string, @Body() data: UpdateRestaurantDto) {
    return this.service.update(id, data);
  }

  @Delete("/:id")
  public delete(@Param("id") id: string) {
    return this.service.delete(id);
  }
}

export default RestaurantController;
