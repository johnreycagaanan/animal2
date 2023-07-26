import { connectToDB } from "@/utils/database";
import Event from "@/models/event";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";

connectToDB();

export async function POST(request) {
  try {
    const userData = getDataFromToken(request);
    const userId = userData.id;
    const reqBody = await request.json();

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
      event,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}

export async function GET(request) {
  try {
    const events = await Event.find();
    return NextResponse.json({
      status: 200,
      events,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}

export async function DELETE(request) {
  try {
    await Event.deleteMany();
    return NextResponse.json({
      status: 200,
      message: "Deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
