import {
  Body,
  JsonController,
  Get,
  Put,
  Param,
  ForbiddenError,
  CurrentUser,
  NotFoundError,
} from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";

import { MenuService } from "../../services";

import { UpdateMenuDto } from "./dto";

@JsonController("/menu")
class MenuController {
  private service = new MenuService();

  @OpenAPI({
    summary: "Get by restaurantId",
  })
  @Get("/restaurant/:restaurantId")
  public async getByRestaurantId(
    @Param("restaurantId") restaurantId: string
  ): Promise<IMenu> {
    try {
      return await this.service.getByRestaurantId(restaurantId);
    } catch {
      throw new NotFoundError("Menu not found");
    }
  }

  @OpenAPI({
    summary: "Get category document with populated dishes",
  })
  @Get("/restaurant/:restaurantId/category/:categoryId")
  public async getCategoryData(
    @Param("restaurantId") restaurantId: string,
    @Param("categoryId") categoryId: string
  ) {
    try {
      return await this.service.getCategoryData(categoryId, restaurantId);
    } catch {
      throw new NotFoundError("Category not found");
    }
  }

  @OpenAPI({
    summary: "Get menu document with populated dishes by restaurantId",
  })
  @Get("/data/restaurant/:restaurantId")
  public async getMenuDataByRestaurantId(
    @Param("restaurantId") restaurantId: string
  ): Promise<IMenuData> {
    try {
      return await this.service.getMenuDataByRestaurantId(restaurantId);
    } catch {
      throw new NotFoundError("Menu data not found");
    }
  }

  @OpenAPI({
    summary: "Update menu document. Returns Menu with populated dishes",
    security: [{ basicAuth: [] }],
  })
  @Put("/:id")
  public async update(
    @Param("id") id: string,
    @Body() data: UpdateMenuDto,
    @CurrentUser() user: IUser
  ): Promise<IMenuData> {
    const entry = await this.service.get(id);

    this.checkUpdatePolicy(entry, user);

    return this.service.updateMenu(id, data);
  }

  private async checkUpdatePolicy(menu: IMenu, user: IUser) {
    const isAdmin = ["admin", "superadmin"].includes(user.role);

    if (!isAdmin || menu.ownerId.toString() !== user._id.toString()) {
      throw new ForbiddenError(
        "User don`t have permission for update this Menu!"
      );
    }
  }
}

export default MenuController;
