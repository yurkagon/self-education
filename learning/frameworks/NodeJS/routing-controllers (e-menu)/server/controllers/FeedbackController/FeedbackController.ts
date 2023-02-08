import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Authorized,
  CurrentUser,
  ForbiddenError,
} from "routing-controllers";

import { OpenAPI } from "routing-controllers-openapi";

import { FeedbackService, RestaurantService } from "../../services";
import { CreateFeedbackDto, UpdateFeedbackDto } from "./dto";

@JsonController("/feedbacks")
class FeedbackController {
  private service = new FeedbackService();
  private restaurantService = new RestaurantService();

  @OpenAPI({
    summary: "Get feedback document by id",
    security: [{ basicAuth: [] }],
  })
  @Get("/:id")
  public async get(
    @Param("id") id: string,
    @CurrentUser({ required: true }) user: IUser
  ): Promise<IFeedback> {
    const feedback = await this.service.get(id);
    const { restaurantId } = feedback;
    const restaurant = await this.restaurantService.get(restaurantId);

    const hasAccess =
      user.role === "superadmin" ||
      user._id.toString() === restaurant.ownerId.toString();

    if (!hasAccess) {
      throw new ForbiddenError("No permission");
    }

    return feedback;
  }

  @OpenAPI({
    summary: "Get all feedback documents",
    security: [{ basicAuth: [] }],
  })
  @Authorized("superadmin")
  @Get("/")
  public getAll(): Promise<IFeedback[]> {
    return this.service.getAll();
  }

  @OpenAPI({
    summary: "Get all feedback documents by restaurant id",
    security: [{ basicAuth: [] }],
  })
  @Get("/restaurant/:id")
  public async getAllByRestaurantId(
    @Param("id") restaurantId: string,
    @CurrentUser({ required: true }) user: IUser
  ): Promise<IFeedback[]> {
    const restaurant = await this.restaurantService.get(restaurantId);

    const hasAccess =
      user.role === "superadmin" ||
      user._id.toString() === restaurant.ownerId.toString();

    if (!hasAccess) {
      throw new ForbiddenError("No permission");
    }

    return this.service.getAllByRestaurantId(restaurantId);
  }

  @OpenAPI({
    summary: "Create feedback document",
  })
  @Post("/")
  public create(@Body() data: CreateFeedbackDto): Promise<IFeedback> {
    return this.service.create(data);
  }

  @OpenAPI({
    summary: "Update feedback document by id",
    security: [{ basicAuth: [] }],
  })
  @Put("/:id")
  public async update(
    @Param("id") id: string,
    @Body() data: UpdateFeedbackDto,
    @CurrentUser({ required: true }) user: IUser
  ): Promise<IFeedback> {
    const feedback = await this.service.get(id);
    const { restaurantId } = feedback;
    const restaurant = await this.restaurantService.get(restaurantId);

    const hasAccess =
      user.role === "superadmin" ||
      user._id.toString() === restaurant.ownerId.toString();

    if (!hasAccess) {
      throw new ForbiddenError("No permission");
    }

    return this.service.update(id, data);
  }

  @OpenAPI({
    summary: "Delete feedback document by id",
    security: [{ basicAuth: [] }],
  })
  @Delete("/:id")
  public async delete(
    @Param("id") id: string,
    @CurrentUser({ required: true }) user: IUser
  ): Promise<IFeedback> {
    const feedback = await this.service.get(id);
    const { restaurantId } = feedback;
    const restaurant = await this.restaurantService.get(restaurantId);

    const hasAccess =
      user.role === "superadmin" ||
      user._id.toString() === restaurant.ownerId.toString();

    if (!hasAccess) throw new ForbiddenError("No access");

    return this.service.delete(id);
  }
}

export default FeedbackController;
