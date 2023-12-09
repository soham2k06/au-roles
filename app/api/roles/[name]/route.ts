import { NextResponse } from "next/server";

import Role from "@/models/Role";
import dbConnect from "@/utils/dbConnect";
import { model } from "mongoose";

export async function GET(
  _: any,
  { params: { name } }: { params: { name: string } }
) {
  try {
    await dbConnect();
    // const Role = model("Role");
    const fetchedData = await Role.findOne({ name });

    return NextResponse.json(fetchedData, { status: 200 });
  } catch (error) {
    console.error("err", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to process get request for this role" },
      { status: 500 }
    );
  }
}
