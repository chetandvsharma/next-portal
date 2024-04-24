import { connectToDB } from "@utils/database";
import Employee from "@models/employee";

export const POST = async (req, res) => {
  const { email, password } = await req.json();

  try {
    await connectToDB();
    const findEmployee = await Employee.findOne({ email, password });
    console.log("find >> ", findEmployee); 
    if (findEmployee) {

        return new Response(findEmployee, { status: 200 });
    } else {
        return new Response('UNAUTHORIZED', { status: 401 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Sign in failed ", { status: 500 });
  }
};
