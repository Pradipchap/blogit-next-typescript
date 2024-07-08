"use client"
import Blogpage from "@/components/Home/Blogpage";

export default function Page({ params }: { params: { search: string } }) {
  const api = `/api/blogs/search?searchString=${params.search}`;
  return <Blogpage api={api} method="GET" />;
}
