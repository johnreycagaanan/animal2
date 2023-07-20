import { connectToDB } from "@/utils/database";
import Event from "@/models/event";

connectToDB();

export async function POST(request) {
  const reqBody = await request.json();

  const { title, details, date } = reqBody;
}
