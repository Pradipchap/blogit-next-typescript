import { NextResponse } from "next/server";
import { ErrorCodes } from "./constants";
export default function sendError(
  errorCode: ErrorCodes,
  message: string,
  statusCode?: number | undefined
) {
  return new NextResponse(
    JSON.stringify({ errorCode, errorMessage: message }),
    { status: statusCode || 500 }
  );
}
