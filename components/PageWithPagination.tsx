import React from "react";
import Blogpage from "./Home/Blogpage";

type props = {
  title?: React.ReactNode;
  api?: string;
  noOfBlogs?: number;
};
export default function PageWithPagination({ title, api, noOfBlogs }: props) {
  return (
    <div className="flex flex-col">
      {title && title}
      <Blogpage api={api} />
    </div>
  );
}
