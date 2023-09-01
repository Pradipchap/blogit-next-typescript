import React from "react";
interface responseType {
  noOfBlogs: number;
  blogs: [];
}
export default async function page() {
  try {
    const response = await fetch("http://localhost:3000/api/blogs");
    const data: responseType = await response.json();
    return <div>{data.noOfBlogs}</div>;
  } catch (error) {
    return <h1>{error as string}</h1>;
  }
}
