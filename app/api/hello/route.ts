import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  console.log("Entered the serverless function");

  return NextResponse.json({ message: "hello" }, { status: 200 });
}
