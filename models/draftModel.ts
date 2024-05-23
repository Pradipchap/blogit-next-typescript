import { Schema, model, models } from "mongoose";
import User from "./userModel";

export const DraftSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  title: {
    type: String,
    required: false,
  },
  genre: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  content: {
    type: Schema.Types.Mixed,
    required: false,
  },
  date: {
    type: Date,
  },
  popularity: {
    type: Number,
  },
});

const Draft = models.Draft || model("Draft", DraftSchema);
export default Draft;
