import jwt from "jsonwebtoken";

export const getDataFromToken = async (request) => {
  try {
    const token = (await request.cookies.get("token")?.value) || "";
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    throw new Error(error.message);
  }
};
