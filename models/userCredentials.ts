import { Schema, models, model } from "mongoose";
import User from "./userModel";

const UserCredentialsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists!!"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  code: {
    type: String,
    required: [false],
  },
  verifiedAt: {
    type: Date,
  },
});

const UserCredentials =
  models.UserCredentials || model("UserCredentials", UserCredentialsSchema);
export default UserCredentials;
