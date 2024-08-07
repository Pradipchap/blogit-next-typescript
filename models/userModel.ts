import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists!!"],
  },
  username: {
    type: String,
    required: [true, "username is required"],
    // match: [
    //   /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
    //   "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    // ],
  },
  image: {
    type: String,
  },
  phone: {
    type: String,
  },
  dateofbirth: {
    type: Date,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
