import { computed } from "mobx";

import MapStore from "abstracts/store/MapStore";

import AuthService from "services/AuthService";

import RestaurantStore from "./RestaurantStore";

class UserStore extends MapStore<IUser> {
  public async load(): Promise<IUser> {
    const user = await AuthService.getUser();

    this.setData(user);

    return user;
  }

  public signOut(): void {
    AuthService.signOut();
    this.removeData();

    RestaurantStore.removeData();
  }

  @computed get fullName(): string {
    return `${this.data.first_name} ${this.data.last_name}`;
  }

  @computed get isAdmin(): boolean {
    return this.data?.role === "admin";
  }

  @computed get isSuperAdmin(): boolean {
    return this.data?.role === "superadmin";
  }
}

const instance = new UserStore();

export default instance;
