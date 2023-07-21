import { connectToDB } from "@/utils/database";
import Event from "@/models/event";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";

connectToDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const userData = getDataFromToken(request);
    const userId = userData.id;
    console.log("userData", userData);
    const { title, details, date } = reqBody;

    const newEvent = new Event({
      postedBy: userId,
      title,
      details,
      date,
    });

    const event = await newEvent.save();

    return NextResponse.json({
      success: true,
      message: "Event added successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
