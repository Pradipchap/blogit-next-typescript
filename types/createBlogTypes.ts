import { OutputData } from "@editorjs/editorjs";

export type detailsForm = {
  title: string;
  genre: string;
  description: string;
  image: File | null;
};
export type blogCardProps = {
  blogid: string;
  title: string;
  profilename: string;
  genre: string;
  profileImage: string;
  image: string;
  description: string;
  date: Date;
};
export type singleBlogProps = {
  _id: string;
  userid: profile;
  title: string;
  genre: string;
  description: string;
  image: string;
  content: OutputData;
  date: Date;
  popularity: number;
};
export type profile = {
  _id: string;
  email: string;
  username: string;
  image: string;
};
