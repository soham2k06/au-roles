import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import { model } from "mongoose";
import Role from "@/models/Role";

export async function POST(req: NextRequest) {
  try {
    const { query, selector } = await req.json();

    await dbConnect();
    // const Role = model("Role");
    const fetchedData = selector
      ? await Role.find(query).select(selector)
      : await Role.find(query);
    return NextResponse.json(fetchedData, { status: 200 });
  } catch (error) {
    console.error("err", (error as Error).message);
    return NextResponse.json(
      { error: "Failed to process get request for roles" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    const { _id } = await req.json();
    // const Role = model("Role");
    const res = await Role.deleteOne({ _id });

    return NextResponse.json(res);
  } catch (error) {
    console.log("err", (error as Error).message);
  }
}
