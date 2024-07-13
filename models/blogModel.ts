import { Schema, model, models } from "mongoose";
import User from "./userModel";

const commentSchema = new Schema({
  comment: { type: String, required: true },
  datetime: { type: Date, default: Date.now },
  userid: { type: Schema.Types.ObjectId, ref: User },
});

export const BlogSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: User,
  },
  title: {
    type: String,
    required: [true, "title is required"],
  },
  genre: {
    type: String,
    required: [true, "genre is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  image: {
    type: String,
    required: false,
  },
  content: {
    type: Schema.Types.Mixed,
    required: [true, "content is required"],
  },
  date: {
    type: Date,
    required: [true, "date is required"],
  },
  thumbs: {
    type: Number,
    required: [true],
  },
  comments: [commentSchema],
  popularity: {
    type: Number,
    required: [true],
  },
});

const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog;
