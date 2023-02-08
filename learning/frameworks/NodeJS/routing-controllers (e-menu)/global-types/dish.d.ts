declare interface IDish {
  _id: string;
  ownerId: string;
  restaurantId: string;
  images: string[];
  description: string;
  name: IName;
  price: number;
  disabled: boolean;
}
