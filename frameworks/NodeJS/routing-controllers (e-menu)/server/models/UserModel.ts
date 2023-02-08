import mongoose from "mongoose";
import validator from "validator";
import Configuration from "../Configuration";

const roles: IRole[] = ["admin", "superadmin"];
const defaultRole: IRole = "admin";

const config = new Configuration();

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Incorrect email",
      },
    },
    password: { type: String, required: true },

    isVerified: {
      type: Boolean,
      // verified in development mode
      default: config.isDev,
    },
    role: {
      type: String,
      lowercase: true,
      enum: roles,
      default: defaultRole,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
