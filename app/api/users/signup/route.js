import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectToDB();
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      userType,
      middleName,
      phoneNumber,
      gender,
      birthday,
      address,
      //   img,
    } = reqBody;

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ message: "User already exists", status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userType,
      middleName,
      phoneNumber,
      gender,
      birthday,
      address,
      //   img
    });

    const savedUser = await newUser.save();

    console.log(savedUser);

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        status: 201,
      },
      savedUser
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
