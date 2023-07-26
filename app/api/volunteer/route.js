import { connectToDB } from "@/utils/database";
import Volunteer from "@/models/volunteer";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";

connectToDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { email, firstName, lastName, phoneNumber, address, workExperience } =
      reqBody;

    const newVolunteer = new Volunteer({
      email,
      firstName,
      lastName,
      phoneNumber,
      address,
      workExperience,
    });

    const volunteer = await newVolunteer.save();

    return NextResponse.json({
      success: true,
      message: "Vet added successfully",
      status: 201,
      volunteer,
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
    const volunteers = await Volunteer.find();
    return NextResponse.json({
      status: 200,
      volunteers,
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
    await Volunteer.deleteMany();
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
