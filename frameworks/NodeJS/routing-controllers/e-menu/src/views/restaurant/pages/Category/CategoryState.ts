import { observable, action } from "mobx";

import MapStore from "abstracts/store/MapStore";
import MenuService from "services/MenuService";

class CategoryState extends MapStore<ICategoryData> {
  @observable isLoading: boolean = false;
  @observable isError: boolean = false;

  public async load(categoryId: string, restaurantId: string): Promise<void> {
    try {
      this.setLoadingStatus(true);

      const data = await MenuService.getCategoryData(categoryId, restaurantId);

      this.setData(data);
    } catch {
      this.setErrorStatus(true);
    } finally {
      this.setLoadingStatus(false);
    }
  }

  @action
  private setLoadingStatus(status: boolean): void {
    this.isLoading = status;
  }

  @action
  private setErrorStatus(status: boolean): void {
    this.isError = status;
  }

  @action
  public removeData() {
    this.isError = false;
    this.isLoading = false;

    super.removeData();
  }

  public get categoryName(): string {
    return this.data?.name?.ua;
  }
}

const instance = new CategoryState();

export default instance;
