import { singleBlogProps } from "./createBlogTypes";

export type responseType = {
  noOfBlogs: number;
  blogs: singleBlogProps[];
};
