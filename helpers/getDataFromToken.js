import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const getDataFromToken = async (request) => {
  try {
    const token = (await request.cookies.get("token")?.value) || "";
    console.log("token", typeOf(token));
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decoded", decoded);
    return decoded;
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Token invalid" });
  }
};
