import { computed } from "mobx";
import filter from "lodash/filter";

import RestaurantStore from "stores/RestaurantStore";
import UserStore from "stores/UserStore";

import {
  Dashboard,
  Menu,
  AddRestaurant,
  TableQRcodes,
  Feedbacks,
  MyProfile,
  MyRestaurant,
} from "../pages";

import SidebarState from "./SidebarState";

class DashboardState {
  public sidebarState = new SidebarState();

  public readonly rootPath = "/admin/dashboard";

  @computed public get initialPage(): string {
    if (UserStore.isAdmin) {
      return RestaurantStore.isDataExist
        ? this.createDashboardPath("menu")
        : this.createDashboardPath("new-restaurant");
    }

    if (UserStore.isSuperAdmin) {
      return this.createDashboardPath("testpage");
    }
  }

  @computed public get sidebarConfig() {
    return filter(
      [
        {
          _tag: "CSidebarNavTitle",
          _children: ["Керування"],
          render: true,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Меню",
          to: this.createDashboardPath("menu"),
          icon: "cil-notes",
          render: UserStore.isAdmin && RestaurantStore.isDataExist,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Тестова сторінка",
          to: this.createDashboardPath("testpage"),
          icon: "cil-speedometer",
          badge: {
            color: "info",
            text: "NEW",
          },
          render: true,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Створити ресторан",
          to: this.createDashboardPath("new-restaurant"),
          icon: "cil-apps-settings",
          render: UserStore.isAdmin && !RestaurantStore.isDataExist,
        },
        {
          _tag: "CSidebarNavItem",
          name: "QR-коди для столиків",
          to: this.createDashboardPath("table-codes"),
          icon: "cil-notes",
          render: UserStore.isAdmin && RestaurantStore.isDataExist,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Відгуки",
          to: this.createDashboardPath("feedbacks"),
          icon: "cil-apps-settings",
          render: UserStore.isAdmin && RestaurantStore.isDataExist,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Мій кабінет",
          to: this.createDashboardPath("my-cabinet"),
          icon: "cil-user",
          render: UserStore.isAdmin,
        },
        {
          _tag: "CSidebarNavItem",
          name: "Мій ресторан",
          to: this.createDashboardPath("my-restaurant"),
          icon: "cil-pencil",
          render: UserStore.isAdmin,
        },
        {
          _tag: "CSidebarNavDivider",
          className: "m-2",
          render: true,
        },
      ],
      "render"
    ).map(({ render, ...el }) => el);
  }

  @computed get routerConfig() {
    return filter(
      [
        {
          path: this.createDashboardPath(""),
          exact: true,
          name: "Дешборд",
          render: true,
        },
        {
          path: this.createDashboardPath("menu"),
          name: "Меню",
          component: Menu,
          render: UserStore.isAdmin && RestaurantStore.isDataExist,
        },
        {
          path: this.createDashboardPath("testpage"),
          name: "Тестова сторінка",
          component: Dashboard,
          render: true,
        },
        {
          path: this.createDashboardPath("new-restaurant"),
          name: "Новий ресторан",
          component: AddRestaurant,
          render: UserStore.isAdmin && !RestaurantStore.isDataExist,
        },
        {
          path: this.createDashboardPath("table-codes"),
          name: "QR-коди для столиків",
          component: TableQRcodes,
          render: UserStore.isAdmin && RestaurantStore.isDataExist,
        },
        {
          path: this.createDashboardPath("feedbacks"),
          name: "Відгуки",
          component: Feedbacks,
          render: UserStore.isAdmin && RestaurantStore.isDataExist,
        },
        {
          path: this.createDashboardPath("my-cabinet"),
          name: "Мій кабінет",
          component: MyProfile,
          render: UserStore.isAdmin,
        },
        {
          path: this.createDashboardPath("my-restaurant"),
          name: "Мій ресторан",
          component: MyRestaurant,
          render: UserStore.isAdmin,
        },
      ],
      "render"
    ).map(({ render, ...el }) => el);
  }

  public createDashboardPath(relativePath: string) {
    return `${this.rootPath}/${relativePath}`;
  }
}

const instance = new DashboardState();

export default instance;
