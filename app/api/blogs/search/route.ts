import { connectToDB } from "@/utils/database";
import Blog from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";
import { ErrorCodes } from "@/utils/constants";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

const GET = async (req: NextRequest, res: NextResponse) => {
  const searchString = await req.nextUrl.searchParams.get("searchString");
  console.log(searchString);
  const pageNo = Number((await req.nextUrl.searchParams.get("pageno")) || "-1");
  try {
    await connectToDB();
    const pipeline =
      pageNo === -1
        ? [
            {
              $search: {
                index: "default",
                autocomplete: {
                  query: searchString,
                  path: "title",
                },
              },
            },
            {
              $project: {
                _id: 1,
                title: 1,
                image: 1,
                description: 1,
                date: 1,
                userid: { $arrayElemAt: ["$userDetails", 0] },
              },
            },
          ]
        : [
            {
              $search: {
                index: "default",
                autocomplete: {
                  query: searchString,
                  path: "title",
                },
              },
            },

            {
              $lookup: {
                from: "users",
                localField: "userid",
                foreignField: "_id",
                as: "userDetails",
              },
            },

            {
              $project: {
                _id: 1,
                title: 1,
                image: 1,
                description: 1,
                date: 1,
                userid: { $arrayElemAt: ["$userDetails", 0] },
              },
            },
          ];
    const blogs = await Blog.aggregate(pipeline).limit(5);
    const noOfBlogs = 5;
    return new NextResponse(
      JSON.stringify({ blogs: blogs, noOfBlogs: noOfBlogs })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        errorCode: ErrorCodes.NORMAL,
        errorMessage: "sorry,something wrong happened",
      }),
      {
        status: 500,
      }
    );
  }
};
export { GET };
