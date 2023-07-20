import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectToDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({
      $or: [{ email: email }, { username: email }],
    });

    if (!user) {
      return NextResponse.json({ message: "User does not exist", status: 400 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ message: "Invalid password", status: 400 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      middleName: user.middleName ? user.middleName : "N/A",
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      birthday: user.birthday,
      userType: user.userType,
      address: user.address,
      img: user.img,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Logged in successfully",
      success: true,
      status: 200,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message, status: 5000 });
  }
}
