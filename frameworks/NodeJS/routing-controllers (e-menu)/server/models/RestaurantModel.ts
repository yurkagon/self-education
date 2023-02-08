import mongoose, { Schema } from "mongoose";
import validator from "validator";

const RestaurantSchema = new Schema(
  {
    name: {
      type: new Schema(
        {
          en: { type: String, required: true },
          ua: String,
          ru: String,
        },
        { _id: false }
      ),
      required: true,
    },
    ownerId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => {
          // TODO: add better correct validator
          return validator.isSlug(value);
        },
        message: "Incorrect slug",
      },
    },
    table_count: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const RestaurantModel = mongoose.model("restaurants", RestaurantSchema);

export default RestaurantModel;
