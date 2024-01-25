import { singleBlogProps } from "./createBlogTypes";

export type responseType = {
  noOfBlogs: number;
  blogs: singleBlogProps[];
};

export type ToastType="success"|"error"|"info"|"loading"