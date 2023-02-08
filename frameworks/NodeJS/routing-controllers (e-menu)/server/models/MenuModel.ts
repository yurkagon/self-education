import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: new Schema(
      {
        ua: { type: String, required: true },
        en: { type: String, required: false },
        ru: { type: String, required: false },
      },
      { _id: false }
    ),
    required: true,
  },
  dishes: { type: [String], required: true, default: [] },
});

const MenuSchema = new Schema(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },
    ownerId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    categories: { type: [CategorySchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const MenuModel = mongoose.model("menus", MenuSchema);

export default MenuModel;
