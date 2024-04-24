import { connectToDB } from "@utils/database";
import Employee from "@models/employee";

export const POST = async (req, res) => {
  const { email, password} = await req.json();

  try {
    await connectToDB();
    const newEntry = new Employee({ email, password });
    await newEntry.save();

    return new Response('Sign up successfully', { status: 201 });
  } catch (error) {
    console.log(error)
    return new Response('Sign up failed ', { status: 500 });
  }
};
