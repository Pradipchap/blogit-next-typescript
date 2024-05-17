import { singleBlogProps } from "./createBlogTypes";

export type responseType = {
  noOfBlogs: number;
  blogs: singleBlogProps[];
};

export type ToastType = "success" | "error" | "info" | "loading";

export interface ErrorInterface {
  errorCode: number;
  errorMessage: string;
}

export interface LoginResult {
  accessToken: string;
  email: string;
  username: string;
  id: string;
  image: string;
}
