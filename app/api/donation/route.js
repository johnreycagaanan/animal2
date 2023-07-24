import { connectToDB } from "@/utils/database";
import Donation from "@/models/donation";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextResponse } from "next/server";

connectToDB();

export async function POST(request) {
  try {
    const userData = getDataFromToken(request);
    const userId = userData.id;
    if (!userData) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized access",
      });
    }
    const reqBody = await request.json();

    const { donor, donationType, date } = reqBody;

    const newDonation = new Donation({
      donor,
      donationType,
      date,
    });

    const donation = await newDonation.save();

    return NextResponse.json({
      success: true,
      message: "Donation added successfully",
      status: 201,
      donation,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
}
