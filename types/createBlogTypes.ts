import { OutputData } from "@editorjs/editorjs";
import { searchBlogType } from "./dataTypes";

export type detailsForm = {
  title: string;
  genre: string;
  description: string;
  image: File | null;
};
export type blogCardProps = searchBlogType & {
  title: string;
  profilename?: string;
  genre?: string;
  profileImage?: string;
  link?: string;
  thumbs?: number;
  comments?: number;
};
export type singleBlogProps = searchBlogType & {
  userid: profile;
  genre: string;
  content: OutputData;
  popularity: number;
};
export type profile = {
  _id: string;
  email: string;
  username: string;
  image: string;
};
