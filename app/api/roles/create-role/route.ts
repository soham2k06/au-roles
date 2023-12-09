import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import { model } from "mongoose";
import Role from "@/models/Role";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const data = await req.json();
    // const Role = model("Role");
    const res = await Role.create(data);

    return NextResponse.json(res);
  } catch (error) {
    console.log("err", (error as Error).message);
  }
}
