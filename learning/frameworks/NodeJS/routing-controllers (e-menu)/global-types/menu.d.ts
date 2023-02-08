declare interface IMenu {
  _id: string;
  restaurantId: string;
  ownerId: string;
  categories: ICategory[];
}

declare interface ICategory {
  _id: string;
  name: IName;
  dishes: string[];
}

declare interface IMenuData extends IMenu {
  categories: ICategoryData[];
}

declare interface ICategoryData extends ICategory {
  dishes: IDish[];
}
