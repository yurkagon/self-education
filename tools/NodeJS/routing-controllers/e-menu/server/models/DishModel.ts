import mongoose, { Schema } from "mongoose";

const DishSchema = new mongoose.Schema(
  {
    name: {
      type: new Schema(
        {
          ua: { type: String, required: true },
          en: String,
          ru: String,
        },
        { _id: false }
      ),
      required: true,
    },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    images: { type: [String], required: false, default: [] },
    disabled: { type: Boolean, required: false, default: false },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DishModel = mongoose.model("dishes", DishSchema);

export default DishModel;
