import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

connectToDB();

export async function POST(request) {
  try {
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
