import { connectToDB } from "@/utils/database";
import Vet from "@/models/vet";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";

connectToDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { name, address, phoneNumber, skills, education, experience } =
      reqBody;

    const newVet = new Vet({
      name,
      address,
      phoneNumber,
      skills,
      education,
      experience,
    });

    const vet = await newVet.save();

    return NextResponse.json({
      success: true,
      message: "Vet added successfully",
      status: 201,
      vet,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
