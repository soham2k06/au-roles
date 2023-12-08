import { NextRequest, NextResponse } from "next/server";
import Role from "@/models/Role";
import dbConnect from "@/utils/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const data = await req.json();
    const res = await Role.create(data);

    return NextResponse.json(res);
  } catch (error) {
    console.log("err", (error as Error).message);
  }
}
