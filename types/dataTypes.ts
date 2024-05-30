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
  userID: string;
  image: string;
  dateofbirth: string;
  phone: string;
}
export interface CookieInterface extends LoginResult {
  expiresIn: string;
}
