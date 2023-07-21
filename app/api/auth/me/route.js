import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
const { getDataFromToken } = require("@/helpers/getDataFromToken");

connectToDB();

export async function GET(request) {
  try {
    const userData = await getDataFromToken(request);
    const user = await User.findOne({ _id: userData.id }).select("-password");

    return NextResponse.json({
      message: "User found",
      user: user,
    });
  } catch (error) {
    return new NextResponse.json({
      message: error.message,
      status: 400,
    });
  }
}
