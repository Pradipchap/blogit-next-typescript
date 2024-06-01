import { NextResponse } from "next/server";
import { ErrorCodes } from "./constants";
export default function sendError(code: ErrorCodes, message: string) {
  return new NextResponse(
    JSON.stringify({ errorCode: code, errorMessage: message })
  );
}
